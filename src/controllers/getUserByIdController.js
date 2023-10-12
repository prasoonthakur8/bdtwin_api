import { getUserById } from "../services/getUserByIdService.js";

const getUser = async (req, res) => {
  const response = await getUserById(req);

  return res.json(response);
}

export { getUser };
