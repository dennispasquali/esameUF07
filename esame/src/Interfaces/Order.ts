
export interface IOrder {
orderWithProducts: ({
        product: {
            id: number;
            length: bigint;
            qt: bigint;
            img: string;
            title: string;
            description: string;
            price: number;
            weigth: number;
            heigth: bigint;
            width: bigint;
            oldPrice: number | null;
            shippingDate: Date;
        };
    } & {
        id: number;
        qt: number;
        idProduct: number;
        idOrder: number;
    })[];


    id: number;
    idUser: number;
    date: Date;
    status: string;
    urlTracking: string;
    typeOrder: string;
}  
    