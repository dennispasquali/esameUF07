import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: number;
  email: string;
  imgProfile?: string;
  name: string;
  surname: string;
  googleId?: string;
}

// Estendiamo la Request di Express per poterci attaccare l'utente
export interface AuthRequest extends Request {
  user?: UserPayload;
}

export const verifyToken = async (req: Request, res: Response,next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
    return res.status(401).send("Accesso negato: Manca il token");
  }

  try {
    // 1. Verifica sincrona: se fallisce, lancia un errore che va nel catch
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;

    // 2. Se siamo qui, il token è valido. Lo attacchiamo alla request.
    (req as AuthRequest).user = decoded;

    // 3. Passiamo al prossimo middleware (la rotta vera e propria)
    next();

  } catch (err) {
    // Se jwt.verify fallisce (scaduto o firma errata), finiamo qui
    return res.status(403).json({ message: "Token non valido o scaduto" });
  }
  
 


}

