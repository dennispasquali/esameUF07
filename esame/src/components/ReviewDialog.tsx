
import Rating from "@mui/material/Rating";
import style from "../ComponentStyle/ReviewDialog.module.css"
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useApiPost } from "../hooks/useApiPost";
import { SnackBarCart } from "../hooks/SnackBarCart";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import type { IReviewDialog } from "../Interfaces/ReviewDialog";
import type { IReviewDialogSubmit } from "../Interfaces/ReviewDialogSubmit";
function ReviewDialog({ isOpen, handleClose,propUserData }: { isOpen: boolean, handleClose: () => void,propUserData:IReviewDialog}) {
    const token=localStorage.getItem('token');
    const { mutate, isPending} = useApiPost<IReviewDialogSubmit,string>(`http://localhost:3000/api/products/${propUserData.productId}/reviews/submit`,token);
    const [isRendered, setIsRendered] = useState(isOpen);
    const [rating,setRating]=useState<number>(-1);
    const [title,setTitle]=useState<string>("");
    const [description,setDescription]=useState<string>("");
    const [genericError,setGenericError]=useState<string>("");
    const { openSnackBar, handleSnack} = SnackBarCart();

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
    }
  }, [isOpen]);


    const triggerClose = (e: React.AnimationEvent) => {
        if (e.target !== e.currentTarget) return;
        if (!isOpen) {
        setIsRendered(false);
        }
    };
    

    function handleSubmit(e:React.FormEvent) {
         e.preventDefault();
            if(isPending===false){
               
                 if(propUserData.id!=null && propUserData.name!=null && propUserData.surname!=null && rating!=-1 && title!="" && description!="") {
                const newReview={
                    userId: propUserData.userId,
                    productId:propUserData.productId,
                    date: new Date(),
                    rating: rating,
                    title: title,
                    description:description,
                } as IReviewDialogSubmit
                console.log(newReview);
                mutate(newReview, {
                  onSuccess: (data) => {
                      console.log("Dati ricevuti nella callback:", data);
                      setTitle("");
                      setRating(-1);
                      setDescription("");
                      setGenericError("");
                  },
                  onError: (error) => {
                    console.error("code: "+error?.status+" message: "+error?.message+" details: "+error?.details);
                    setGenericError("Errore nel creare la recensione "+error?.message);
                }
                  
              });
              } else {
                setGenericError("Dati non validi per rilasciare la recensione");
              }

               handleSnack();
            } else {
                //carica
            }
             
    }
    if(!isRendered) {
        return null;
    } else {
        const isClosing = !isOpen;
        return (
        <div className={`${style.modal} ${isClosing ? style.overlayClosing : style.overlayOpening}`} onClick={handleClose} onAnimationEnd={triggerClose}>
            <div className={`${style.modal_int} ${isClosing ? style.modalClosing : style.modalOpening}`} onClick={(e) => e.stopPropagation()}>
                <div className={style.review_first_row} >
              {propUserData.imgProfile ? <img src={"https://i.pravatar.cc/150?img=5"}></img>: <img src="//external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F036%2F280%2F651%2Flarge_2x%2Fdefault-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg&f=1&nofb=1&ipt=e13129a2a92bcc094263a9986fc65034cf7d079677dce4062b0d3f77716caf6e"></img>}
              
              <span>{propUserData.name+" "+propUserData.surname}</span>
            </div>
            <p className={style.evaluation}>Dai la tua Valutazione: </p>
            <Rating

                size="large"
                className={style.rating}
                name="simple-uncontrolled"
                value={rating}
                onChange={(_,newValue) => {
                    if(newValue!=null && newValue>=1 && newValue<=5) {
                        setRating(newValue);
                    }
                    
                }}
                defaultValue={0}
            />
            <div className={style.title_textField}>
            <TextField
            label="Titolo: "
            rows={1}           // Altezza fissa di 4 righe
            variant="outlined"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            />
            </div>
            

            <TextField
            className={style.textFieldArea}
            label="La tua Recensione: "
            multiline          
            rows={8}           // Altezza fissa di 4 righe
            fullWidth          
            variant="outlined"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            />

            <Button className={style.buttons} onClick={handleClose} variant="contained">Annulla</Button>
            <Button className={style.buttons} onClick={handleSubmit} variant="contained">Pubblica</Button>

            </div>
            {genericError!=""?<Snackbar
            
                        open={openSnackBar}
                        autoHideDuration={1000}
                        onClose={handleSnack}
                
                    >
                        <Alert
                onClose={handleSnack}
                severity="error"
                sx={{ width: '100%' }}
                >
                {genericError}
                </Alert>
                    </Snackbar>:<Snackbar
            
                        open={openSnackBar}
                        autoHideDuration={1000}
                        onClose={handleSnack}
                
                    >
                        <Alert
                onClose={handleSnack}
                severity="success"
                sx={{ width: '100%' }}
                >
                Recensione Pubblicata
                </Alert>
                    </Snackbar>}
        </div>
    )
    }
    
}

export default ReviewDialog