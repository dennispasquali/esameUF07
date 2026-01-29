export interface ICartOrder{
    id: number, 
    idProduct: number,
    qtMax:number, 
    title: string, 
    unitPrice: number,
    url: string,
    alt: string,
    quantity: number,
    details?: string
}