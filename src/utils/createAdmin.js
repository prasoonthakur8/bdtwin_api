import mongoose from "mongoose";

import User from "../models/User.js";
import Role from "../models/Role.js";
import Wallet from "../models/Wallet.js";

const createAdmin = async () => {
  const session = await mongoose.startSession();

  try {
    const existingUser = await User.findOne({ email: 'admin@admin.com' });
    if (!existingUser) {
      const role = await Role.findOne({ role: 'admin' });

      session.startTransaction();

      const newUser = new User({
        user_name: 'admin',
        email: 'admin@admin.com',
        phone_number: '1234567890',
        password: '$2b$10$4O6K8JqYgJteQJWNRWxIzeWvDqaZPxipgk86C8GwVCBgxDF1EqGhi',
        full_name: 'Admin Admin',
        country: 'USA',
        date_of_birth: new Date('1990-01-01'),
        is_verified: true,
        role: role
      });
      const user = await newUser.save();

      const wallet = new Wallet({
        balance: 500000,
        user: user
      });
      await wallet.save();

      await session.commitTransaction();

      console.log('User created successfully!');
    } else {
      console.log('User already exists.');
    }
  } catch (error) {
    await session.abortTransaction();

    console.error(error);
  }
};

export default createAdmin;
