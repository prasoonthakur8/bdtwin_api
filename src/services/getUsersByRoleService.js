import User from "../models/User.js";
import Role from "../models/Role.js";
import { getUserData } from "../resources/userResource.js";

const getAllUsersByRole = async (req) => {
  try {
    const { role } = req.body;
    const agentRole = await Role.findOne({ role: role });

    if (!agentRole) {
      return [];
    }

    const usersByRole = await User.find({ role: agentRole._id }).populate('role');

    const userDataPromises = usersByRole.map((user) => getUserData(user));
    const userDataList = await Promise.all(userDataPromises);

    return {
      message:{
        users: userDataList
      }
    };
  } catch (error) {
    console.error(error);

    throw error;
  }
}

export { getAllUsersByRole };
