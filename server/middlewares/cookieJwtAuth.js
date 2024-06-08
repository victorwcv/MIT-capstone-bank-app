import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';

export const cookieJwtAuth = (req, res, next) => {
  // Get token from header
  const {token} = req.cookies;
  if (!token) return res.status(401).json({ message: 'No Token provided.', link:'/' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Authenticate correctly");
    req.user = decoded;
    next();
  } catch (error) {
    next(errorHandler(403,'Invalid Token'))
  }
}