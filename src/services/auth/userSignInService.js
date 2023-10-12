import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../../models/User.js";
import { getUserData } from "../../resources/userResource.js";

const userSignIn = async (req) => {
  try {
    const { user_name, password } = req;

    const user = await User.findOne({ user_name: user_name }).populate('role');

    if (!user)
      return { message: 'User not found.', status: 404 };

    const checked = await bcrypt.compare(password, user.password);

    if (checked === false)
      return { message: 'Authentication failed.', status: 403 };

    const token = jwt.sign({ user: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const person = await getUserData(user);

    return {
      message: {
        token: token,
        user: person
      }
    };
  } catch (error) {
    console.error(error.message);

    return { status: 500 };
  }
};

export { userSignIn };
