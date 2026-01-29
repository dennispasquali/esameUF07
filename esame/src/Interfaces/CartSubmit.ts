export interface ICartSubmit{
    idProduct:number,
    idUser:number,
    date:  Date,
    status: "carrello"
    urlTracking: "",
    typeOrder: "standard",
    qt: number,
    priceAtPurchase: number,
}