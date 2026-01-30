import type { IProductItem } from "../Interfaces/ProductItem";
import style from '../ComponentStyle/ProductItem.module.css'
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { SnackBarCart } from "../hooks/useSnackBarCart";
import type { IUserProfile } from "../Interfaces/UserJWT";
import { useApiPost } from "../hooks/useApiPost";
import type { ICartSubmit } from "../Interfaces/CartSubmit";

type TProductItem = IProductItem & {
  reset: () => void;
};

function ProductItem({ reset, id, img, qt, title, description, rating, numberOfRatings, price, oldPrice, shippingDate }: TProductItem) {
  //RECUPERO IL TOKEN JWT UTENTE 
  const token: string | null = localStorage.getItem("token");
  //LEGGO I DATI JSON DELL'UTENTE SALVATI NELLA PROCEDURA DI REGISTRAZIONE E LOGIN
  const storedUserString: string | null = localStorage.getItem('user');
  const user: IUserProfile | null = storedUserString ? JSON.parse(storedUserString) : null;
  //CHIAMATA API PER AGGIUNGERE I PRODOTTI AL CARRELLO
  const { mutate, isPending, error } = useApiPost<ICartSubmit, string>(`http://localhost:3000/api/cart/submit`, token);
  //HOOK PER LA SNACKBAR
  const { openSnackBar, handleSnack } = SnackBarCart();
  const navigate = useNavigate();

  //DATI CHE VENGONO ALLA PAGINA DI PRODUCT DETAIL TRAMITE STATE
  const productData: IProductItem = {
    id,
    img,
    title,
    description,
    rating,
    numberOfRatings,
    price,
    shippingDate,
    oldPrice,
    qt
  }

  //SE C'è UN ERRORE NEL REPERIRE I PRODOTTI LO COMUNICO
  if (error) {
    console.error("code: " + error?.status + " message: " + error?.message + " details: " + error?.details);
    return (<h2>Errore nella visualizzazione dei prodotti</h2>)
  } else {


    /**
     * FUNZIONE CHE SI OCCUPA DI AGGIUNGERE UN PRODOTTO AL CARRELLO SE L'UTENTE SI è REGISTRATO O LOGGATO
     * @returns void (aggiorna gli useState)
    */
    function handleAddToCart() {
      console.log(user);
      if (token !== null && user !== null) {
        const cartData: ICartSubmit = {
          idProduct: id,
          idUser: user.id,
          date: new Date(),
          status: "carrello",
          urlTracking: "",
          typeOrder: "standard",
          qt: 1,
          priceAtPurchase: price,
        }


        mutate(cartData, {
          onSuccess: (data) => {
            console.log("Dati ricevuti nella callback:", data);
          },
          onError: (error) => {
            console.error("code: " + error?.status + " message: " + error?.message + " details: " + error?.details);

          }

        })

      }
      handleSnack();
    }


    /**
     * FUNZIONE CHE SI OCCUPA DI FAR PASSARE L'UTENTE ALLA PAGINA DI PRODUCT DETAIL NON APPENA CLICCA IL TITOLO DEL PRODOTTO
     * @returns void FA IL NAVIGATE VERSO PRODUCT DETAIL
    */
    function handleProductClick() {
      reset();
      // Naviga verso l'URL specifico usando l'ID passato nelle props
      navigate(`/home/productDetail/${id}`, { state: productData });
    }


    //MI RICAVO IL PREZZO DEL PRODOTTO SUDDIVIDENDOLO TRA PARTE INTERA E DECIMALE E LASCIO SOLO 2 NR PER LA PARTE DECIMALE
    // Esempio: 29 diventa "29.00", 29.9 diventa "29.90"
    const priceString = price.toFixed(2);
    const [intero, decimali] = priceString.split('.');



    return (
      <div className={style.product_card} >
        {/* 1. Immagine Prodotto */}
        <div className={style.product_image_container}>
          <img src={img} alt={title} />
        </div>

        {/* 2. Informazioni */}
        <div className={style.product_info}>
          <h3 className={style.product_title}>{title}</h3>
          <p onClick={handleProductClick} className={style.product_description}>{description}</p>
          {/* Simulazione stelline */}
          <div className={style.product_rating}>
            <span className={style.rating}>({rating})</span><span className={style.stars}><Rating name="read-only" value={rating} precision={0.1} size="small" readOnly /></span><span className={style.rating_count}>({numberOfRatings})</span>
          </div>

          {/* 3. Prezzo e Bottone */}
          <div className={style.product_price_section}>
            <div className={style.price_row}>
              <span className={style.current_price}>€{intero}</span>
              <span className={style.fraction}>{decimali}</span>
              {oldPrice && <span className={style.old_price}>Consigliato €{oldPrice}</span>}
            </div>
            <button onClick={handleAddToCart} className={style.add_to_cart_btn}>Aggiungi al carrello</button>


            {/*GESTIONE CON LE SNACKBAR DI EVENTUALI ERRORI DI AGGIUNTA PRODOTTI AL CARRELLO*/}
            {token === null || user === null ? 
            <Snackbar
              open={openSnackBar}
              autoHideDuration={1000}
              onClose={handleSnack}>


              <Alert
                onClose={handleSnack}
                severity="error"
                sx={{ width: '100%' }}>
                Devi prima registrarti
              </Alert>

            </Snackbar> : isPending === false && error === null ? 
            
            <Snackbar
              open={openSnackBar}
              autoHideDuration={1000}
              onClose={handleSnack}>


              <Alert
                onClose={handleSnack}
                severity="success"
                sx={{ width: '100%' }}>
                Prodotto aggiunto correttamente al carrello
              </Alert>

            </Snackbar> : error !== null ? 
            
            <Snackbar
              open={openSnackBar}
              autoHideDuration={1000}
              onClose={handleSnack}>


            <Alert
                onClose={handleSnack}
                severity="error"
                sx={{ width: '100%' }}>
                C'è stato un problema nell aggiungere il prodotto al carrello
              </Alert>
            </Snackbar> : ""}


          </div>
        </div>
      </div>
    );
  }

};

export default ProductItem;
