import jwt from "jsonwebtoken";

import { userJwtVerify } from "../jwtVerificationService.js";

const refreshUserToken = async (req) => {
  const user = await userJwtVerify(req);

  const token = jwt.sign({ user: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  return { 
    message: {
      token: token
    }
  };
};

export { refreshUserToken };
