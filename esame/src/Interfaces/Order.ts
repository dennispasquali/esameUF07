export interface IOrder {
  id: string, 
  date: string, 
  title: string, 
  price: string,
  status: string, 
  statusColor: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
  url: string,
  alt: string
}