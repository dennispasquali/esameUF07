import { Router } from "express";
import { AuthRequest, verifyToken } from "../middleware/authMiddleware";
import { login } from "../controllers/LoginController";
import prisma from "../prisma";

const router = Router();

// POST http://localhost:3000/api/login
router.post("/submit", login);

// GET http://localhost:3000/api/login/verify
router.get("/verify", verifyToken, async (req, res) => {
  const request = req as AuthRequest;

  if (!request.user || !request.user.email) {
    return res
      .status(404)
      .json({ message: "Utente mail non trovata nel token" });
  }

  try {
    const email: string = request.user.email;
    const userInfo = await prisma.user.findUnique({
      where: { email: email },
    });
    if (!userInfo) {
      return res
        .status(404)
        .json({ message: "Utente non trovato nel database" });
    }
    return res.status(200).json(userInfo);
  } catch (err) {
    console.error("Errore verifica utente:", err);
    return res
      .status(500)
      .json({ message: "Errore del server durante la verifica" });
  }
});

export default router;
