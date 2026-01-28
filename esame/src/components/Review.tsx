import type { IReview } from "../Interfaces/Review";
import style from "../ComponentStyle/Review.module.css";
import Rating from "@mui/material/Rating";




function Review(props: IReview) {

    
    
    return(
       
        <div className={style.review_container}>
            <div className={style.review_first_row}>
              {props.imgProfile?  <img src={props.imgProfile}></img>:<img src="//external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F036%2F280%2F651%2Flarge_2x%2Fdefault-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg&f=1&nofb=1&ipt=e13129a2a92bcc094263a9986fc65034cf7d079677dce4062b0d3f77716caf6e"></img>}
              
              <span>{props.name+" "+props.surname}</span>
            </div>
            <div className={style.review_second_row}>
              <span><Rating name="read-only" value={props.rating} precision={0.1} size="small" readOnly /></span>
              <span className={style.title}>{props.title}</span>
            </div>
            <div>
                <p className={style.date}>Reviewed on: {new Date(props.date).toLocaleDateString('it-IT')}</p>
                <p>{props.description}</p>
            </div>
            
            </div>
    )
}

export default Review;