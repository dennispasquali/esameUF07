import type { RatingScore } from "./Review";
export interface IReviewDialogSubmit{
    userId: number,
    productId:number,
    date: Date,
    rating: RatingScore,
    title: string,
    description:string,
}