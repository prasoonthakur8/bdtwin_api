import mongoose from "mongoose";
import bcrypt from "bcrypt";

import User from "../models/User.js";
import Wallet from "../models/Wallet.js";

const createUser = async (req, authUser, role) => {
  const { user_name, email, phone_number, password, full_name } = req;

  const session = await mongoose.startSession();

  try {
    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {

      session.startTransaction();

      const newUser = new User({
        user_name: user_name,
        email: email,
        phone_number: phone_number,
        password: await bcrypt.hash(password, 10),
        full_name: full_name,
        is_verified: true,
        role: role
      });
      let user = await newUser.save();

      const wallet = new Wallet({
        balance: 0,
        user: user
      });
      await wallet.save();

      authUser.attached_users.push(user);
      await authUser.save();

      if (role.role === 'player') {
        const data = {
          api_password: process.env.BLUEOCEANGAMING_API_PASSWORD,
          api_login: process.env.BLUEOCEANGAMING_API_USERNAME,
          method: "createPlayer",
          user_username: user_name,
          user_password: process.env.GAME_HUB_PASSWORD,
          user_nickname: user_name,
          currency: process.env.CURRENCY
        };

        const player_remote_id = await fetch(process.env.BLUEOCEANGAMING_API_URL, {
          method: "POST",
          body: JSON.stringify(data)
        })
        .then((response) => {
          return response.json();
        })
        .catch((error) => {
          return error;
        });

        user.player_remote_id = player_remote_id.response.id;
        await user.save();
      }

      await session.commitTransaction();

      return {
        message: {
          user: user
        }
      };
    } else {
      return { message: 'User already exists.', status: 403 };
    }
  } catch (error) {
    await session.abortTransaction();

    console.error(error.message);

    return { message: false };
  }
};

export { createUser };
