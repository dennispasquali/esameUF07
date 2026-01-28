
import type { IUserProfile } from "./UserJWT";

export interface IReviewDialog extends IUserProfile {
    productId: number;
    userId:number;
}