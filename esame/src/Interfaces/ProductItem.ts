export interface IProductItem {
  id: number;
  image: string;
  title: string;
  description: string;
  rating: number; // Es: 4/5
  numberOfRatings: number;
  price: number;  // Es: "29.99"
  oldPrice?: string; // Opzionale: non tutti i prodotti sono scontati
}
