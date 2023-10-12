import { refreshUserToken } from "../../services/auth/refreshTokenService.js";

const refreshToken = async (req, res) => {
  const response = await refreshUserToken(req.header('token'));

  return res.json(response);
};

export { refreshToken };
