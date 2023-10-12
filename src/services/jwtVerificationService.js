import jwt from "jsonwebtoken";

import User from "../models/User.js";

const userJwtVerify = async (req) => {
  try {
    const token = jwt.verify(req, process.env.JWT_SECRET);

    const user = await User.findById(token.user);

    if (!user)
      return false;

    return user;
  } catch (error) {
    console.error(error.message);

    return false;
  }
};

export { userJwtVerify };
