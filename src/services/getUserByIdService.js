import User from "../models/User.js";
import { getUserData } from "../resources/userResource.js";

const getUserById = async (req) => {
  try {
    const { user_id } = req.body;

    const user = await User.findOne({ _id: user_id }).populate('role');

    const person = await getUserData(user);

    return {
      message:{
        user: person
      }
    };
  } catch (error) {
    console.error(error);

    return { status: 404 }
  }
}

export { getUserById };
