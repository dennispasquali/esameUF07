import type { IReview } from "../Interfaces/Reviews";
import style from "../ComponentStyle/Review.module.css";
import Rating from "@mui/material/Rating";

function Review(props: IReview) {
    return(
       
        <div className={style.review_container}>
            <div className={style.review_first_row}>
              <img src={props.userAvatar}></img>
              <span>{props.userName}</span>
            </div>
            <div className={style.review_second_row}>
              <span><Rating name="read-only" value={props.rating} precision={0.1} size="small" readOnly /></span>
              <span className={style.title}>{props.title}</span>
            </div>
            <div>
                <p className={style.date}>Reviewed on: {props.date}</p>
                <p>{props.description}</p>
            </div>
            
            </div>
    )
}

export default Review