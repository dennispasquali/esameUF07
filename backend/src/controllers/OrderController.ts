import { Request, Response } from "express";
import prisma from "../prisma";
import { AuthRequest } from "../middleware/authMiddleware";
import { userInfo } from "node:os";

export const getOrdersToArrive = async (req: Request, res: Response) => {
  try {
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

      const ordini = await prisma.order.findMany({
        where: {
          idUser: userInfo.id,
          status: {
            in: ["In produzione", "Spedito", "Ricevuto"],
          },
        },
        include: {
          product: true,
        },
        orderBy: {
          date: "desc",
        },
      });

      if (!ordini) {
        return res.status(404).json({
          message: "L'utente non ha ancora effettuato ordini sul sito",
        });
      }
      console.log(ordini);

      res.json(ordini);
    } catch (err) {
      console.error("Errore verifica utente:", err);
      return res
        .status(500)
        .json({ message: "Errore del server durante la verifica" });
    }
  } catch (error) {
    const stringaDettaglio =
      error instanceof Error ? error.message : String(error);
    console.error("Errore API Prodotti:", error);
    res.status(500).send(stringaDettaglio);
  }
};

export const getOrdersArrived = async (req: Request, res: Response) => {
  try {
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

      const ordini = await prisma.order.findMany({
        where: {
          idUser: userInfo.id,
          status: {
            in: ["Consegnato"],
          },
        },

        include: {
          product: true,
        },
        orderBy: {
          date: "desc",
        },
      });

      if (!ordini) {
        return res.status(404).json({
          message: "L'utente non ha ancora effettuato ordini sul sito",
        });
      }
      console.log(ordini);

      res.json(ordini);
    } catch (err) {
      console.error("Errore verifica utente:", err);
      return res
        .status(500)
        .json({ message: "Errore del server durante la verifica" });
    }
  } catch (error) {
    const stringaDettaglio =
      error instanceof Error ? error.message : String(error);
    console.error("Errore API Prodotti:", error);
    res.status(500).send(stringaDettaglio);
  }
};
