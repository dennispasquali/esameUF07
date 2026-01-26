// src/controllers/prodottoController.ts
import { Request, Response } from 'express';
import prisma from '../prisma';
import { title } from 'node:process';

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};
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

    if (prodotti.length===0) {
      return res.status(404).send('Prodotti non trovati');
    }

    const risultato = prodotti.map((prodotto) => {
    
    const numberOfRatings:number = prodotto.reviews.length;
    let ratingSum:number=0;
    prodotto.reviews.map((review)=>{
        ratingSum+=review.rating;
    })

    let rating:number=0;
    if(numberOfRatings>0) {
      rating=Number((ratingSum/numberOfRatings).toFixed(1));
    }
    
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
    const stringaDettaglio = error instanceof Error ? error.message : String(error);
    console.error("Errore API Prodotti:", error);
    res.status(500).send(stringaDettaglio);
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
       return res.status(404).send('Prodotto non trovato' );
    }
    const reviews=prodotto.reviews;

    if(reviews.length===0) {
       return res.status(404).send('Recensioni non trovate' );
    }


    const risultato = reviews.map((review) => {
      
      if(!review.customer) {
         return res.status(404).send('Utente recensione non trovato');
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
    const stringaDettaglio = error instanceof Error ? error.message : String(error);
    console.error("Errore API Prodotti:", error);
    res.status(500).send(stringaDettaglio);
  }
};

export const submitProductReview = async (req: Request, res: Response) =>{

 
  const { idCliente, idProdotto, titolo, descrizione, valutazione } = req.body;

  try {
    
    if (!idCliente || !idProdotto || !valutazione || !titolo || !valutazione || !descrizione) {
      return res.status(400).send("uno dei dati è mancante");
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
    const stringaDettaglio = error instanceof Error ? error.message : String(error);
    console.error("Errore API Prodotti:", error);
    res.status(500).send(stringaDettaglio);
  }

}