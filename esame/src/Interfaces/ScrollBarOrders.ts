import type { IOrder } from "./Order";


export interface IScrollBarOrders  {
    orders: IOrder[];
    height?: string; // Opzionale: per personalizzare l'altezza
}