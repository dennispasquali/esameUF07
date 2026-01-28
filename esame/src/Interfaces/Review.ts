export interface IReview {
  id: number;
  name: string;
  surname:string;
  imgProfile?: string;
  title: string;
  description: string;
  rating: number; // Da 1 a 5
  date: Date;   // Formato "YYYY-MM-DD"
}
