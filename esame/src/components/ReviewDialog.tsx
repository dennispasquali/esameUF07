
import Rating from "@mui/material/Rating";
import style from "../ComponentStyle/ReviewDialog.module.css"
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
function ReviewDialog({ isOpen, handleClose }: { isOpen: boolean, handleClose: () => void }) {
   const [isRendered, setIsRendered] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsRendered(true);
    }
  }, [isOpen]);


    const triggerClose = (e: React.AnimationEvent) => {
        if (e.target !== e.currentTarget) return;
        if (!isOpen) {
        setIsRendered(false);
        }
    };

    function handleSubmit() {

    }
    if(!isRendered) {
        return null;
    } else {
        const isClosing = !isOpen;
        return (
        <div className={`${style.modal} ${isClosing ? style.overlayClosing : style.overlayOpening}`} onClick={handleClose} onAnimationEnd={triggerClose}>
            <div className={`${style.modal_int} ${isClosing ? style.modalClosing : style.modalOpening}`} onClick={(e) => e.stopPropagation()}>
                <div className={style.review_first_row} >
              <img src={"https://i.pravatar.cc/150?img=5"}></img>
              <span>{"Dennis Pasquali"}</span>
            </div>
            <p className={style.evaluation}>Dai la tua Valutazione: </p>
            <Rating
                size="large"
                className={style.rating}
                name="simple-uncontrolled"
                onChange={(event, newValue) => {
                console.log(newValue);
                }}
                defaultValue={0}
            />
            <div className={style.title_textField}>
            <TextField
            label="Titolo: "
            rows={1}           // Altezza fissa di 4 righe
            variant="outlined"
            />
            </div>
            

            <TextField
            className={style.textFieldArea}
            label="La tua Recensione: "
            multiline          
            rows={8}           // Altezza fissa di 4 righe
            fullWidth          
            variant="outlined"
            />

            <Button className={style.buttons} onClick={handleClose} variant="contained">Annulla</Button>
            <Button className={style.buttons} onClick={handleSubmit} variant="contained">Pubblica</Button>

            </div>
            
        </div>
    )
    }
    
}

export default ReviewDialog