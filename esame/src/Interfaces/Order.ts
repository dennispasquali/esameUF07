export interface IOrder {
  id: number, 
  date: string, 
  title: string, 
  price: number,
  status: string, 
  statusColor: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
  url: string,
  alt: string,
  quantity: number,

}