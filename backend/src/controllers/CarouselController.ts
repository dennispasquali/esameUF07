import { PrismaClient } from "@prisma/client";
import { Request, Response } from 'express';


const prisma = new PrismaClient();
export const getImageData = async (req: Request, res: Response) => {
  try {
     const imgData = await prisma.carosello.findMany({
        orderBy: {
        id: 'asc' 
      }

     });
     if(!imgData) {
         return res.status(404).send('Immagini carosello non trovate');
     }
     res.json(imgData);
  } catch(error) {
      const stringaDettaglio = error instanceof Error ? error.message : String(error);
      console.error("Errore API Prodotti:", error);
      res.status(500).send(stringaDettaglio);
    }

}