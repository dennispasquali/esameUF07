export interface IOrder {
    id: number;
    qt: number;
    idUser: number;
    date: Date;
    status: string;
    urlTracking: string;
    typeOrder: string;
    priceAtPurchase: number;
    idProduct: number;
    product: {
        id: number;
        img: string;
        title: string;
        description: string;
        price: number;
        qt: bigint;
        weigth: number;
        heigth: bigint;
        width: bigint;
        length: bigint;
        oldPrice: number | null;
        shippingDate: Date;
    };
} 
    
