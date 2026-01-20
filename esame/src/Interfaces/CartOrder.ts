export interface CartOrder{
    id: number,  
    title: string, 
    unitPrice: number,
    url: string,
    alt: string,
    quantity: number,
    details?: string
}