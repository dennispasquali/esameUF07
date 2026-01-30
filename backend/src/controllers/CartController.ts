import { Request, Response } from "express";
import prisma from "../prisma";
import { AuthRequest } from "../middleware/authMiddleware";
import { userInfo } from "node:os";

export interface ICartSubmit {
  idProduct: number;
  idUser: number;
  date: Date;
  status: "carrello";
  urlTracking: "";
  typeOrder: "standard";
  qt: number;
  priceAtPurchase: number;
}
export const addToCart = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    if (!data.qt) {
      return res.status(400).send("quantita mancante");
    }
    const findExistingOrder = await prisma.order.findFirst({
      where: {
        idUser: Number(data.idUser),
        status: "carrello",
        idProduct: Number(data.idProduct),
      },
      include: {
        product: true,
      },
    });

    if (!findExistingOrder) {
      const findExistingProduct = await prisma.product.findUnique({
        where: { id: Number(data.idProduct) },
      });

      if (!findExistingProduct) {
        return res.status(404).send("Prodotto non trovato");
      }

      if (findExistingProduct.qt < data.qt) {
        return res.status(400).send("la qt di prodotto selezionata è troppa");
      }
      const newCartOrder = await prisma.order.create({
        data: {
          idUser: Number(data.idUser),
          date: data.date,
          qt: data.qt,
          priceAtPurchase: data.priceAtPurchase,
          urlTracking: data.urlTracking,
          idProduct: data.idProduct,
          typeOrder: data.typeOrder,
          status: data.status,
        },
      });

      if (!newCartOrder) {
        return res
          .status(423)
          .send("i dati inviati sono invalidi semanticamente");
      }
    } else {
      const existingProductRow = findExistingOrder;

      if (existingProductRow) {
        if (
          data.qt + Number(existingProductRow.qt) >
          existingProductRow.product.qt
        ) {
          return res.status(400).send("la qt di prodotto selezionata è troppa");
        }
        const updateOrdet = await prisma.order.update({
          where: { id: Number(existingProductRow.id) },
          data: {
            qt: {
              increment: data.qt,
            },
          },
        });
      }
    }

    res.json("prodotto aggiunto o rimosso correttamente al carrello");
  } catch (error) {
    const stringaDettaglio =
      error instanceof Error ? error.message : String(error);
    console.error("Errore API Prodotti:", error);
    res.status(500).send(stringaDettaglio);
  }
};

export interface ICartOrder {
  id: number;
  idProduct: number;
  qtMax: number;
  title: string;
  unitPrice: number;
  url: string;
  alt: string;
  quantity: number;
  details?: string;
}

export interface IOrderWithProducts {
  id: number;
  qt: number;
  priceAtPurchase: number;
  idProduct: number;
  idOrder: number;
  product: {
    id: number;
    qt: bigint;
    title: string;
    img: string;
    description: string;
    price: number;
    weigth: number;
    heigth: bigint;
    width: bigint;
    length: bigint;
    oldPrice: number | null;
    shippingDate: Date;
  };
}

export const getCart = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(id);
    if (!id) {
      return res.status(400).send("id non trovato");
    }
    const cartOrders = await prisma.order.findMany({
      where: {
        idUser: Number(id),
        status: "carrello",
      },
      include: {
        product: true,
      },
    });
    if (!cartOrders) {
      return res.status(404).send("ordini carrello non trovati");
    }
    let result: ICartOrder[] = [];
    const mergedCart = new Map();
    cartOrders.forEach((order) => {
      const productId = order.idProduct;

      const quantity = order.qt;

      if (mergedCart.has(productId)) {
        // SE ESISTE GIÀ: Aggiorniamo solo la quantità
        const existingItem = mergedCart.get(productId);
        existingItem.quantity += quantity;
        mergedCart.set(productId, existingItem);
      } else {
        mergedCart.set(productId, {
          id: order.id,
          title: order.product.title,
          idProduct: order.product.id,
          qtMax: Number(order.product.qt),
          unitPrice: order.priceAtPurchase,
          url: order.product.img, // Mapping: img -> url
          alt: order.product.title, // Mapping: title -> alt
          quantity: order.qt, // Quantità iniziale
        } as ICartOrder);
      }
    });

    console.log(mergedCart.values());
    const finalCartArray = Array.from(mergedCart.values());
    res.json(finalCartArray);
  } catch (error) {
    const stringaDettaglio =
      error instanceof Error ? error.message : String(error);
    console.error("Errore API Prodotti:", error);
    res.status(500).send(stringaDettaglio);
  }
};

export const deleteProductCart = async (req: Request, res: Response) => {
  try {
    const { idOrder } = req.params;
    if (!idOrder) {
      return res.status(400).send("id prodotto non trovato");
    }

    await prisma.order.delete({
      where: {
        id: Number(idOrder),
      },
    });

    res.json("prodotti cancellati dal carrello correttamente");
  } catch (error) {
    const stringaDettaglio =
      error instanceof Error ? error.message : String(error);
    console.error("Errore API Prodotti:", error);
    res.status(500).send(stringaDettaglio);
  }
};
