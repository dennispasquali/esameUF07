import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import style from "../PagesStyle/ProductDetail.module.css"; // Assicurati di creare questo file
import { Alert, CircularProgress, Rating, Snackbar, TextField } from "@mui/material";
import Review from "../components/Review";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add'
import ReviewDialog from "../components/ReviewDialog";
import Footer from "../components/Footer";
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import type { IProductItem } from "../Interfaces/ProductItem";
import { SnackBarCart } from "../hooks/SnackBarCart";
import { useFetchApiGet } from "../hooks/useFetchApiGet";
import type { IReview } from "../Interfaces/Review";
import type {IUserProfile } from "../Interfaces/UserJWT";
import type { IReviewDialog } from "../Interfaces/ReviewDialog";
import { useApiPost } from "../hooks/useApiPost";
import type { ICartSubmit } from "../Interfaces/CartSubmit";
function ProductDetail() {

  const FREE_SHIPPING_LIMIT_PRICE:number=50;
  const PRICE_FOR_SHIPPING:string="15.00€";
  const location = useLocation();
  const navigate = useNavigate();
  const productData:IProductItem = location.state;
  const [openDialog,setOpenDialog]=useState<boolean>(false);
  const quantityRef = useRef<HTMLInputElement>(null);
  const {data,error,loading}=useFetchApiGet<IReview[]>(`http://localhost:3000/api/products/${productData.id}/reviews`);
  const [userData,setUserData]=useState<IReviewDialog | null>(null);
  const [addReviewError,setAddReviewError]=useState<string>("");
  const token:string |null=localStorage.getItem('token');
    const { openSnackBar, handleSnack} = SnackBarCart();
      const { openSnackBar:openSnackBarCart, handleSnack:handleSnackBarCart} = SnackBarCart();
  const {error: errorV,data :dataV}= useFetchApiGet<IUserProfile>("http://localhost:3000/api/login/verify",token);

      const storedUserString = localStorage.getItem('user');
       // 2. Se esiste, convertila (parse). Altrimenti imposta null.
       const user: IUserProfile | null = storedUserString ? JSON.parse(storedUserString) : null;
      const { mutate, isPending,error:errorCartSubmit} = useApiPost<ICartSubmit,string>(`http://localhost:3000/api/cart/submit`,token);

  if(errorCartSubmit) {
   console.error("code: "+error?.status+" message: "+error?.message+" details: "+error?.details);
  }


  function handleAddToCart() {
     console.log(user);
      if(quantityRef!==null && quantityRef.current!==null && quantityRef.current.value!=="") {
        if(token!==null && user!==null) {
         const cartData :ICartSubmit={
            idProduct:productData.id,
            idUser:user.id,
            date: new Date(),
            status: "carrello",
            urlTracking: "",
            typeOrder: "standard",
            qt: parseInt(quantityRef.current.value),
            priceAtPurchase: productData.price,
          }

          
      mutate(cartData, {
        onSuccess: (data) => {
            console.log("Dati ricevuti nella callback:", data);
        },
        onError: (error) => {
          console.error("code: "+error?.status+" message: "+error?.message+" details: "+error?.details);
         
      }
      }) 
      
        
      }
     
      }              
      handleSnackBarCart();
  }

  console.log(productData);
  let reviews:IReview[]=[];
  if(data!==null) {
    reviews=data;
    console.log(data);
  }
  

  const handleClickOpen = () => {
    
    if(localStorage.getItem('token')!==null && dataV!==null) {
      if(dataV) {
        //metto id prodottto nei dati da passare al backend cosi quando reviewDialog glieli manda sa a che prodotto collegare la recensione
        const dataToPass:IReviewDialog={
          id:-1,
          name:dataV.name,
          surname:dataV.surname,
          email:dataV.email,
          imgProfile:dataV.imgProfile,
          userId:dataV.id,
          productId:productData.id

        }
        setUserData(dataToPass);
        setOpenDialog(true);
      } else {
       console.error("code: "+errorV?.status+" message: "+errorV?.message+" details: "+errorV?.details);
       setAddReviewError(""+errorV?.details);
       handleSnack();
      }
    } else {
      setAddReviewError("devi prima registrarti");
      handleSnack();
    }
    
  };

  const handleClose = () => {
    setOpenDialog(false);
  };


  
  useEffect(() => {
    if (!productData) {
      navigate("/home");
    }
  }, [productData, navigate]);

  // Se i dati non ci sono ancora (evita crash durante il redirect)
  if (!productData) return null;

  const priceFixed=productData.price.toFixed(2);
  

  


  function handleQuantityChange() {
    if(quantityRef!=null && quantityRef.current!=null && quantityRef.current.value!==null) {
      const val:number|null = parseInt(quantityRef.current.value);
    if(val>productData.qt) {
      quantityRef.current.value=String(productData.qt);
    } else if(val<=0 || isNaN(val)) {
      quantityRef.current.value=String(1);
    }
    }
    
  }

  if(error){
     console.log("code: "+error?.status+" message: "+error?.message+" details: "+error?.details);
  }

  return (
    <>
      <NavBar />
      
      <div className={style.pdp_container}>
        
        {/* --- ZONA SUPERIORE (Immagine - Info - BuyBox) --- */}
        <div className={style.product_main_section}>
          
          {/* 1. Immagine */}
          <div className={style.product_image_col}>
            <img src={productData.img} alt={productData.title} className={style.main_img} />
          </div>

          {/* 2. Dettagli Centrali */}
          <div className={style.product_info_col}>
            <h1>{productData.title}</h1>
            
            {productData.rating!==null ? <div className={style.rating_row}>
                <span>{productData.rating.toFixed(1)}</span>
              <span className={style.rating_count}>
                <Rating name="read-only" value={productData.rating} precision={0.1} size="small" readOnly />
              </span>
              <span className={style.numberOfRatings}>({productData.numberOfRatings})</span>
            </div>:  ""}
            

            <hr className={style.separator} />

            <div className={style.price_info}>
                <span className={style.current_price}>
                <span className={style.currency}>€</span>
                {priceFixed}
                </span>
              {productData.oldPrice && (
                <span className={style.old_price}>€ {productData.oldPrice}</span>
              )}
              
              <span className={style.vat_msg}>Tutti i prezzi includono l'IVA. In base all’indirizzo di spedizione, l’IVA potrebbe variare durante il processo di acquisto</span>
            </div>

            <div className={style.description_box}>
              <h3>Informazioni su questo articolo:</h3>
              <p>{productData.description}</p>
            </div>
          </div>

          {/* 3. La "Buy Box" (Colonna destra per l'acquisto) */}
          <div className={style.buy_box_col}>
            <div className={style.buy_box_card}>
              <div className={style.price_large}>{priceFixed} €</div>
              
              <div className={style.delivery_info}>
                Consegna {productData.price>FREE_SHIPPING_LIMIT_PRICE ? "GRATUITA" : PRICE_FOR_SHIPPING} <strong><br></br>Per il {new Date(productData.shippingDate).toLocaleDateString('it-IT')}</strong>.
                <br />
                Disponibilità: {productData.qt} prodotti
              </div>

              {/* Selettore Quantità */}
              <div className={style.quantity_selector}>
                <TextField
                
                inputRef={quantityRef}
                onBlur={handleQuantityChange}
                size="small"
                label="Quantità"
                type="number"
                InputProps={{ inputProps: { min: 1,max: productData.qt} }} // Opzionale: limiti
                variant="outlined"
                />
              </div>

              {/* Pulsanti Azione */}
              <div className={style.actions}>
                <button 
                  className={`${style.btn} ${style['btn_primary']}`} 
                  onClick={handleAddToCart}
                >
                  Aggiungi al carrello
                </button>
               
                {quantityRef===null || quantityRef.current===null ||  quantityRef.current.value===""?<Snackbar

          open={openSnackBarCart}
          autoHideDuration={1000}
          onClose={handleSnackBarCart}
 
        >

       
          <Alert
    onClose={handleSnackBarCart}
    severity="error"
    sx={{ width: '100%' }}
  >
    Devi Selezionare la quantità
  </Alert>
        </Snackbar>:token===null || user===null? <Snackbar

          open={openSnackBarCart}
          autoHideDuration={1000}
          onClose={handleSnackBarCart}
 
        >

       
          <Alert
    onClose={handleSnackBarCart}
    severity="error"
    sx={{ width: '100%' }}
  >
    Devi prima registrarti
  </Alert>
        </Snackbar>:isPending===false && errorCartSubmit===null? <Snackbar

          open={openSnackBarCart}
          autoHideDuration={1000}
          onClose={handleSnackBarCart}
 
        >

       
          <Alert
    onClose={handleSnackBarCart}
    severity="success"
    sx={{ width: '100%' }}
  >
    Prodotto aggiunto correttamente al carrello
  </Alert>
        </Snackbar>: isPending===false && errorCartSubmit!==null ? <Snackbar

          open={openSnackBarCart}
          autoHideDuration={1000}
          onClose={handleSnackBarCart}
 
        >

       
          <Alert
    onClose={handleSnackBarCart}
    severity="error"
    sx={{ width: '100%' }}
  >
    C'è stato un problema nell aggiungere il prodotto al carrello
  </Alert>
        </Snackbar>: ""}
                
                <button 
                  className={`${style.btn} ${style['btn_secondary']}`}
                  onClick={() => console.log("Vai al checkout")}
                >
                  Acquista ora
                </button>
              </div>
              
              <div className={style.secure_transaction}>
                <AssuredWorkloadIcon/> Transazione sicura
              </div>
            </div>
          </div>
        </div>

        {/* --- ZONA INFERIORE (Recensioni) --- */}
        {productData.rating!==null? <div id={style.reviews_section}>
          <h2>Recensioni Clienti</h2>
              
            <div className={style.average_rating}>
              <span className={style.big_score}>{productData.rating.toFixed(1)}</span>
              <div className={style.stars_wrapper}>
                {<Rating name={"read-only"} value={productData.rating} precision={0.1} size="small" readOnly />}
              </div>
            </div>

            <div className={style.title_thirdRow}>
              <p>Basato su {productData.numberOfRatings} recensioni globali</p>
              <Button onClick={handleClickOpen} id={style.addReviewButton} variant="contained" endIcon={<AddIcon/>}>Aggiungi Recensione</Button>
            </div>
            
           
              <div id={style.div_review}>
                {loading? <CircularProgress className={style.loading}></CircularProgress> :  error!==null && reviews.length===0? <p>Non ci sono recensioni</p> : error? "": reviews.map((review) => (
                  <Review 
                    key={review.id}
                    id={review.id}
                    imgProfile={review.imgProfile}
                    description={review.description} // Nuovo
                    title={review.title}
                    date={review.date}
                    name={review.name}
                    surname={review.surname}
                    rating={review.rating}
                    />
                ))}
                
            </div>
        </div>

    :  <div className={style.rowEmptyReviews}><div> <h2>Recensioni Clienti</h2>  <p>Non ci sono recensioni</p></div> <span> <Button onClick={handleClickOpen} id={style.addReviewButton} variant="contained" endIcon={<AddIcon/>}>Aggiungi Recensione</Button></span>
  </div> }
  {userData?  <ReviewDialog propUserData={userData} isOpen={openDialog} handleClose={handleClose}></ReviewDialog>:<Snackbar
                
                          open={openSnackBar}
                          autoHideDuration={1000}
                          onClose={handleSnack}
                 
                        >
                          <Alert
                    onClose={handleSnack}
                    severity="error"
                    sx={{ width: '100%' }}
                  >
                    {addReviewError}
                  </Alert>
                        </Snackbar>}
          </div> 
      <Footer/>
    </>
  );
}

export default ProductDetail;