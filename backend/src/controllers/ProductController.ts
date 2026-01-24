// src/controllers/prodottoController.ts
import { Request, Response } from 'express';
import prisma from '../prisma';
import { title } from 'node:process';
export const getProdotti = async (req: Request, res: Response) => {
  try {
  


    const prodotti = await prisma.product.findMany({
        include: {
        reviews: true 
      },
      orderBy: {
        id: 'asc' // I più recenti per primi
      }
    });

    if (!prodotti) {
      return res.status(404).json({ error: 'Prodotti non trovati' });
    }

    const risultato = prodotti.map((prodotto) => {
    
    const numberOfRatings:number = prodotto.reviews.length;
    let ratingSum:number=0;
    prodotto.reviews.map((review)=>{
        ratingSum+=review.rating;
    })

    const rating:number=Number((ratingSum/numberOfRatings).toFixed(1));
    return {
        id: prodotto.id,
        title: prodotto.title,
        price: prodotto.price,
        description: prodotto.description,
        img: prodotto.img,
        oldPrice: prodotto.oldPrice,
        shippingDate: prodotto.shippingDate,
        qt: prodotto.qt,
        numberOfRatings,
        rating
    }



    });
    
    
    res.json(risultato);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dei prodotti' });
  }
};

export const getReviewsByProdottoId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const prodotto = await prisma.product.findUnique({
      where: { id: Number(id) },
      include: { 
        reviews: {
          include: {
            customer: {
              include: {
                user: true
              }
            }
          }
        } 
      } 
    });
    
     if(!prodotto) {
       return res.status(404).json({ error: 'Prodotto non trovato' });
    }
    const reviews=prodotto.reviews;

    if(!reviews) {
       return res.status(404).json({ error: 'Recensioni non trovate' });
    }


    const risultato = reviews.map((review) => {
      
      if(!review.customer) {
         return res.status(404).json({ error: 'Utente recensione non trovato' });
      }

      const imgProfile=review.customer.imgProfile;
      const userName=review.customer.user.name+" "+review.customer.user.surname;
      return {
        id: review.id,
        title: review.title,
        description: review.description,
        rating: review.rating,
        date: review.date,
        imgProfile,
        userName,

      }
    })

    res.json(risultato);
  } catch (error) {
    res.status(500).json({ error: 'Errore server' });
  }
};

export const submitProductReview = async (req: Request, res: Response) =>{

 
  const { idCliente, idProdotto, titolo, descrizione, valutazione } = req.body;

  try {
    
    if (!idCliente || !idProdotto || !valutazione || !titolo || !valutazione || !descrizione) {
      return res.status(400).json({ error: "Dati mancanti" });
    }

    // 3. Creazione della recensione nel DB
    const nuovaRecensione = await prisma.review.create({
      data: {
        idCustomer: Number(idCliente),   
        idProduct: Number(idProdotto),
        title: titolo,
        description: descrizione,
        rating: Number(valutazione),
        date: new Date() 
      }
    })
 
} catch(error) {
    res.status(500).json({ error: 'Errore server' });
  }

}