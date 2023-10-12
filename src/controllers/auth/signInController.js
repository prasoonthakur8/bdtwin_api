import { userSignIn } from "../../services/auth/userSignInService.js";

const signIn = async (req, res) => {
  const response = await userSignIn(req.body);

  const status = response.status || 200;

  return res.status(status).json(response);
}

export { signIn };
