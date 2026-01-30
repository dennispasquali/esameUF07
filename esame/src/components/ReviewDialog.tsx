
import Rating from "@mui/material/Rating";
import style from "../ComponentStyle/ReviewDialog.module.css"
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useApiPost } from "../hooks/useApiPost";
import { SnackBarCart } from "../hooks/useSnackBarCart";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import type { IReviewDialog } from "../Interfaces/ReviewDialog";
import type { IReviewDialogSubmit } from "../Interfaces/ReviewDialogSubmit";


//COMPONENTE CHE MOSTRA LA FINESTRA MODALE PER PUBBLICARE LE RECENSIONI SE LOGGATI O REGISTRATI
//PRENDE COME PARAMETRI DAL PADRE DEL FUNZIONI PER CHIUDERSI O APRIRSI E I DATI DA MOSTRARE DELL'UTENTE (PROPUSERDATA)
function ReviewDialog({ isOpen, handleClose, propUserData }: { isOpen: boolean, handleClose: () => void, propUserData: IReviewDialog }) {
    //RECUPERO IL TOKEN JWT E PREPARO UNA CHIAMATA API POST CON QUESTO TOKEN PER L'INVIO EVENTUALE DELLA RECENSIONE AL SERVER
    const token = localStorage.getItem('token');
    const { mutate } = useApiPost<IReviewDialogSubmit, string>(`http://localhost:3000/api/products/${propUserData.productId}/reviews/submit`, token);
    //USE STATE PER GESTIRE IL RENDER DELLA FINESTRA MODALE
    const [isRendered, setIsRendered] = useState(isOpen);
    //USE STATE CHE CONTENGONO I DATI SCRITTI DALL'UTENTE NELLA FINESTRA MODALE
    const [rating, setRating] = useState<number>(-1);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [genericError, setGenericError] = useState<string>("");
    const { openSnackBar, handleSnack } = SnackBarCart();

    //SE LA FINESTRA DEVE APRIRSI DEVE ESSERE RENDERIZZATA
    useEffect(() => {
        if (isOpen) {
            setIsRendered(true);
        }
    }, [isOpen]);

    //SE LA FINESTRA DEVE CHIUDERSI DEVE ESSERE NASCOSTA
    const triggerClose = (e: React.AnimationEvent) => {
        if (e.target !== e.currentTarget) return;
        if (!isOpen) {
            setIsRendered(false);
        }
    };

    /**
     * FUNZIONE CHE SI OCCUPA DI EFFETTUARE LA CHIMATA API PER AGGIUNGERE LA RECENSIONE AL DB
     * * @param e - EVENTO DI SUBMIT DEL FORM (USATO PER EVITARE CHE LA FINESTRA SI RICARICHI AL SUBMIT)
     * @returns void (aggiorna gli useState di errore o stampa i dati ricevuti)
    */
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        //CONTROLLO SE CI SONO TUTTI I DATI VALIDI PER RILASCIARE LA RECENSIONE
        if (propUserData.id != null && propUserData.name != null && propUserData.surname != null && rating != -1 && title != "" && description != "") {
            const newReview = {
                userId: propUserData.userId,
                productId: propUserData.productId,
                date: new Date(),
                rating: rating,
                title: title,
                description: description,
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
                    console.error("code: " + error?.status + " message: " + error?.message + " details: " + error?.details);
                    setGenericError("Errore nel creare la recensione " + error?.message);
                }

            });
        } else {
            setGenericError("Dati non validi per rilasciare la recensione");
        }

        handleSnack();

    }

    //SE IL COMPONENTE NON è RENDERIZZATO NON RESTITUISCO NIENTE
    if (!isRendered) {
        return null;
    } else {
        const isClosing = !isOpen;
        return (

            <div className={`${style.modal} ${isClosing ? style.overlayClosing : style.overlayOpening}`} onClick={handleClose} onAnimationEnd={triggerClose}>
                <div className={`${style.modal_int} ${isClosing ? style.modalClosing : style.modalOpening}`} onClick={(e) => e.stopPropagation()}>
                    {/* SEZIONE INFO UTENTE */}
                    <div className={style.review_first_row} >
                        {propUserData.imgProfile ? <img src={"https://i.pravatar.cc/150?img=5"}></img> : <img src="//external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F036%2F280%2F651%2Flarge_2x%2Fdefault-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg&f=1&nofb=1&ipt=e13129a2a92bcc094263a9986fc65034cf7d079677dce4062b0d3f77716caf6e"></img>}
                        <span>{propUserData.name + " " + propUserData.surname}</span>
                    </div>

                    {/* SEZIONE PER INSERIRE LA VALUTAZIONE */}
                    <p className={style.evaluation}>Dai la tua Valutazione: </p>
                    <Rating
                        size="large"
                        className={style.rating}
                        name="simple-uncontrolled"
                        value={rating}
                        //CONTROLLO CHE IL RATING SI SETTATO TRA 1 E 5 E NON SIA NULL
                        onChange={(_, newValue) => {
                            if (newValue != null && newValue >= 1 && newValue <= 5) {
                                setRating(newValue);
                            }

                        }}
                        defaultValue={0}
                    />

                    {/* SEZIONE PER INSERIRE IL TITOLO */}
                    <div className={style.title_textField}>
                        <TextField
                            label="Titolo: "
                            rows={1}           
                            variant="outlined"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    {/* SEZIONE PER INSERIRE LA RECENSIONE VERA E PROPRIA */}
                    <TextField
                        className={style.textFieldArea}
                        label="La tua Recensione: "
                        multiline
                        rows={8}
                        fullWidth
                        variant="outlined"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    {/* SEZIONE BOTTONI */}
                    <Button className={style.buttons} onClick={handleClose} variant="contained">Annulla</Button>
                    <Button className={style.buttons} onClick={handleSubmit} variant="contained">Pubblica</Button>

                </div>

                {/* SEZIONE SNACKBAR DI ERRORE O SUCCESSO AGGIUNTA RECENSIONE */}
                {genericError != "" ?

                    <Snackbar
                        open={openSnackBar}
                        autoHideDuration={1000}
                        onClose={handleSnack}>

                        <Alert
                            onClose={handleSnack}
                            severity="error"
                            sx={{ width: '100%' }}>
                            {genericError}
                        </Alert>
                    </Snackbar> :

                    <Snackbar
                        open={openSnackBar}
                        autoHideDuration={1000}
                        onClose={handleSnack}>

                        <Alert
                            onClose={handleSnack}
                            severity="success"
                            sx={{ width: '100%' }}>
                            Recensione Pubblicata
                        </Alert>
                    </Snackbar>}
            </div>
        )
    }

}

export default ReviewDialog