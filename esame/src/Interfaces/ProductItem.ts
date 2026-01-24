export interface IProductItem {
  id: number;
  img: string;
  title: string;
  description: string;
  price: number;
  oldPrice: number | null;
  rating: number;
  numberOfRatings: number;
  qt:number;
  shippingDate: Date;
}

