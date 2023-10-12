import Wallet from "../models/Wallet.js";
import User from "../models/User.js";

const getUserData = async (req) => {
  const userWallet = await Wallet.findOne({ user: req });

  const userData = await User.find({ attached_users: req._id }).populate('role');
  
  if (userData[0]) {
    var parent = {
      id: userData[0].id,
      full_name: userData[0].full_name,
      email: userData[0].email,
      phone_number: userData[0].phone_number,
      role: userData[0].role.role,
      user_name: userData[0].user_name
    }
  } else {
    var parent = null;
  }

  const user = {
    id: req._id,
    user_name: req.user_name,
    email: req.email,
    phone_number: req.phone_number,
    full_name: req.full_name,
    country: req.country,
    date_of_birth: req.date_of_birth,
    id_verified: req.id_verified,
    attached_users: req.attached_users,
    date_time: req.date_time,
    balance: userWallet.balance,
    role: req.role.role,
    parent: parent
  }
  return user;

}

export { getUserData };
