import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: number;
  email: string;
  imgProfile?: string;
  name: string;
  surname: string;
  googleId?: string;
}

export interface AuthRequest extends Request {
  user?: UserPayload;
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send("Accesso negato: Manca il token");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
    (req as AuthRequest).user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token non valido o scaduto" });
  }
};
