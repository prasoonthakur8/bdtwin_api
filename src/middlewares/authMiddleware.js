import { userJwtVerify } from "../services/jwtVerificationService.js";

const authMiddleware = async (req, res, next) => {
  const token = req.header('token');

  if (!token)
    return res.status(401).json({ message: 'Authentication failed.'});

  const user = await userJwtVerify(token);

  if (!user)
    return res.status(401).json({ message: 'Authentication failed.'});

  next();
};

export { authMiddleware };
