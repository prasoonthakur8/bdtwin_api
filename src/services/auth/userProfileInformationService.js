import bcrypt from "bcrypt";

import User from "../../models/User.js";
import { getUserData } from "../../resources/userResource.js";

const changeUserProfile = async (req) => {
  const { user_id, user_name, email, phone_number, password, full_name, country, date_of_birth } = req.body;

  let user = await User.findOne({ _id: user_id });

  user.user_name = user_name;
  user.email = email;
  user.phone_number = phone_number;
  if (password)
    user.password = await bcrypt.hash(password, 10);
  user.full_name = full_name;
  user.country = country;
  user.date_of_birth = date_of_birth;

  await user.save();

  const person = await getUserData(user);

  return {
    message: {
      user: person
    }
  };
};

export { changeUserProfile };
