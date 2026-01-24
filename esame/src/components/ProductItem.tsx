import type { IProductItem } from "../Interfaces/ProductItem";
import style from'../ComponentStyle/ProductItem.module.css'
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { SnackBarCart } from "../hooks/SnackBarCart";

type TProductItem = IProductItem & {
  reset: () => void;
};
function ProductItem({reset,id,img,qt, title,description,rating,numberOfRatings,price,oldPrice,shippingDate}: TProductItem) {
    
    const { openSnackBar, handleSnack} = SnackBarCart();
    const navigate = useNavigate();
    const productData :IProductItem={
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
    // Funzione handler nominata (non anonima/lambda)
    function handleProductClick() {
        reset();
        // Naviga verso l'URL specifico usando l'ID passato nelle props
        navigate(`/home/productDetail/${id}`, {state: productData});
    }
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
        <p   onClick={handleProductClick} className={style.product_description}>{description}</p>
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
          <button onClick={handleSnack} className={style.add_to_cart_btn}>Aggiungi al carrello</button>
          <Snackbar

          open={openSnackBar}
          autoHideDuration={1000}
          onClose={handleSnack}
 
        >


          <Alert
    onClose={handleSnack}
    severity="success"
    sx={{ width: '100%' }}
  >
    Prodotto aggiunto al carrello
  </Alert>
        </Snackbar>

        </div>
      </div>
    </div>
  );
};

export default ProductItem;
