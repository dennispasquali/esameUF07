import type { RatingScore } from "./Review";

export interface IProductItem {
  id: number;
  img: string;
  title: string;
  description: string;
  price: number;
  oldPrice: number | null;
  rating: RatingScore;
  numberOfRatings: number;
  qt:number;
  shippingDate: Date;
}

