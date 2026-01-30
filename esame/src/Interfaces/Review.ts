export type RatingScore = 1 | 2 | 3 | 4 | 5;
export interface IReview {
  id: number;
  name: string;
  surname:string;
  imgProfile?: string;
  title: string;
  description: string;
  rating: RatingScore; // Da 1 a 5
  date: Date;   // Formato "YYYY-MM-DD"
}
