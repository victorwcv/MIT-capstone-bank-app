import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const RJWT_SECRET = process.env.RJWT_SECRET;
const JWT_EXPIRES_IN = "1h";
const RJWT_EXPIRES_IN = "7d";

if(!JWT_SECRET || !RJWT_SECRET) {
  throw new Error("Don't exist JWT secret")
}

export const generateAccessToken = (payload: { id: string }) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};

export const generateRefreshToken = (payload: { id: string }) => {
  return jwt.sign(payload, RJWT_SECRET, { expiresIn: RJWT_EXPIRES_IN });
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, RJWT_SECRET);
};