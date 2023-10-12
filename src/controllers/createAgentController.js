import { createUser } from "../services/createUserService.js";
import { userJwtVerify } from "../services/jwtVerificationService.js";

import Role from "../models/Role.js";

const createAgent = async (req, res) => {
  const role = await Role.findOne({ role: 'agent' });
  const authUser = await userJwtVerify(req.header('token'));

  const response = await createUser(req.body, authUser, role);

  const status = response.status || 200;

  return res.status(status).json(response);
};

export { createAgent };
