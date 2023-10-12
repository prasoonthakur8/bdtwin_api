import { getAllUsersByRole } from "../services/getUsersByRoleService.js";

const getUsersByRole = async (req, res) => {
  const response = await getAllUsersByRole(req);

  return res.json(response);
};

export { getUsersByRole };
