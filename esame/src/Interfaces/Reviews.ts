export interface IReview {
  id: number;
  userName: string;
  userAvatar: string;
  title: string;
  description: string;
  rating: number; // Da 1 a 5
  date: string;   // Formato "YYYY-MM-DD"
}