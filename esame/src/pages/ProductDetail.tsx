import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import style from "../PagesStyle/ProductDetail.module.css"; // Assicurati di creare questo file
import { Rating, TextField } from "@mui/material";
import Review from "../components/Review";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add'
import ReviewDialog from "../components/ReviewDialog";
function ProductDetail() {

  const reviews=[
  {
    "id": 101,
    "userName": "Giulia Bianchi",
    "userAvatar": "https://i.pravatar.cc/150?img=5",
    "title": "Assolutamente fantastico!",
    "description": "Ho acquistato questo prodotto due settimane fa e non potrei essere più felice. La qualità costruttiva è eccellente e fa esattamente quello che promette. Spedizione velocissima, arrivato in 24 ore.",
    "rating": 5,
    "date": "2023-11-15"
  },
  {
    "id": 102,
    "userName": "Marco Esposito",
    "userAvatar": "https://i.pravatar.cc/150?img=11",
    "title": "Buono, ma con qualche difetto",
    "description": "Il prodotto è valido e funziona bene, ma la batteria dura meno di quanto dichiarato. Per il resto nulla da dire, materiali solidi e design molto curato.",
    "rating": 3,
    "date": "2023-10-22"
  },
  {
    "id": 103,
    "userName": "Francesca Costa",
    "userAvatar": "https://i.pravatar.cc/150?img=9",
    "title": "Rapporto qualità-prezzo imbattibile",
    "description": "Non credevo si potesse avere così tanto spendendo così poco. Consiglio vivamente a chi cerca un'alternativa economica ai marchi più blasonati.",
    "rating": 5,
    "date": "2023-12-05"
  },
  {
    "id": 104,
    "userName": "Alessandro Romano",
    "userAvatar": "https://i.pravatar.cc/150?img=13",
    "title": "Pessima esperienza",
    "description": "Il pacco è arrivato danneggiato e il servizio clienti ha impiegato tre giorni per rispondermi. Il prodotto in sé sembra fragile. Chiesto il rimborso.",
    "rating": 1,
    "date": "2023-09-10"
  },
  {
    "id": 105,
    "userName": "Elena Ricci",
    "userAvatar": "https://i.pravatar.cc/150?img=24",
    "title": "Molto utile, ma istruzioni poco chiare",
    "description": "Ho fatto fatica a configurarlo inizialmente perché il manuale è solo in inglese e scritto molto piccolo. Una volta capito come funziona, è diventato indispensabile.",
    "rating": 4,
    "date": "2024-01-02"
  },
  {
    "id": 106,
    "userName": "Davide Ferri",
    "userAvatar": "https://i.pravatar.cc/150?img=33",
    "title": "Soddisfatto a metà",
    "description": "Esteticamente è bellissimo, ma tecnicamente mi aspettavo di più. A volte si blocca e devo riavviarlo. Spero in un aggiornamento software.",
    "rating": 3,
    "date": "2023-11-30"
  },
  {
    "id": 107,
    "userName": "Martina Gallo",
    "userAvatar": "https://i.pravatar.cc/150?img=44",
    "title": "Regalo perfetto",
    "description": "Preso per il compleanno di mio marito, è rimasto contentissimo! La confezione regalo era molto curata. Grazie Amazon!",
    "rating": 5,
    "date": "2023-12-20"
  },
  {
    "id": 108,
    "userName": "Luca Moretti",
    "userAvatar": "https://i.pravatar.cc/150?img=59",
    "title": "Non compatibile con il mio sistema",
    "description": "Attenzione: nella descrizione c'è scritto compatibile con tutti i sistemi, ma sul mio PC datato non viene riconosciuto. Ho dovuto fare il reso.",
    "rating": 2,
    "date": "2023-10-05"
  },
  {
    "id": 109,
    "userName": "Sara Vitali",
    "userAvatar": "https://i.pravatar.cc/150?img=32",
    "title": "Esattamente come in foto",
    "description": "Spesso le foto ingannano, ma questo prodotto è fedele al 100%. Colore brillante e finiture perfette. Comprerò sicuramente altro da questo venditore.",
    "rating": 5,
    "date": "2024-01-15"
  },
  {
    "id": 110,
    "userName": "Giovanni De Luca",
    "userAvatar": "https://i.pravatar.cc/150?img=68",
    "title": "Fa il suo dovere",
    "description": "Niente di eccezionale, un prodotto onesto per quello che costa. Lo uso quotidianamente senza problemi.",
    "rating": 4,
    "date": "2023-11-08"
  }
];


  const location = useLocation();
  const navigate = useNavigate();
  const productData = location.state;
  const [openDialog,setOpenDialog]=useState(false);


  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    
    setOpenDialog(false);
  };
  // Stato per la quantità selezionata
  const [quantity] = useState(1);

  // 1. Gestione Redirect Sicuro: Se non ci sono dati, torna alla home
  useEffect(() => {
    if (!productData) {
      navigate("/home");
    }
  }, [productData, navigate]);

  // Se i dati non ci sono ancora (evita crash durante il redirect)
  if (!productData) return null;

  const priceFixed=productData.price.toFixed(2);
  

  
  return (
    <>
      <NavBar />
      
      <div className={style.pdp_container}>
        
        {/* --- ZONA SUPERIORE (Immagine - Info - BuyBox) --- */}
        <div className={style.product_main_section}>
          
          {/* 1. Immagine */}
          <div className={style.product_image_col}>
            <img src={productData.image} alt={productData.title} className={style.main_img} />
          </div>

          {/* 2. Dettagli Centrali */}
          <div className={style.product_info_col}>
            <h1>{productData.title}</h1>
            
            <div className={style.rating_row}>
                <span>{productData.rating}</span>
              <span className={style.rating_count}>
                <Rating name="read-only" value={productData.rating} precision={0.1} size="small" readOnly />
              </span>
              <span className={style.numberOfRatings}>({productData.numberOfRatings})</span>
            </div>

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
              <div className={style.price_large}>€ {priceFixed}</div>
              
              <div className={style.delivery_info}>
                Consegna GRATUITA <strong>domani</strong>.
                <br />
                Disponibilità immediata.
              </div>

              {/* Selettore Quantità */}
              <div className={style.quantity_selector}>
                <TextField
                size="small"
                label="Quantità"
                type="number"
                InputProps={{ inputProps: { min: 1} }} // Opzionale: limiti
                variant="outlined"
                />
              </div>

              {/* Pulsanti Azione */}
              <div className={style.actions}>
                <button 
                  className={`${style.btn} ${style['btn_primary']}`} 
                  onClick={() => console.log(`Aggiunto al carrello: ${quantity} x ${productData.title}`)}
                >
                  Aggiungi al carrello
                </button>
                
                <button 
                  className={`${style.btn} ${style['btn_secondary']}`}
                  onClick={() => console.log("Vai al checkout")}
                >
                  Acquista ora
                </button>
              </div>
              
              <div className={style.secure_transaction}>
                🔒 Transazione sicura
              </div>
            </div>
          </div>
        </div>

        {/* --- ZONA INFERIORE (Recensioni) --- */}
        <div id={style.reviews_section}>
          <h2>Recensioni Clienti</h2>
          
            <div className={style.average_rating}>
              <span className={style.big_score}>{productData.rating}</span>
              <div className={style.stars_wrapper}>
                {<Rating name={"read-only"} value={productData.rating} precision={0.1} size="small" readOnly />}
              </div>
            </div>

            <div className={style.title_thirdRow}>
              <p>Basato su {productData.numberOfRatings} recensioni globali</p>
              <Button onClick={handleClickOpen} id={style.addReviewButton} variant="contained" endIcon={<AddIcon/>}>Add a Review</Button>
            </div>
            <ReviewDialog isOpen={openDialog} handleClose={handleClose}></ReviewDialog>
              <div id={style.div_review}>
                {reviews.map((review) => (
                  <Review 
                    id={review.id}
                    userAvatar={review.userAvatar}
                    description={review.description} // Nuovo
                    title={review.title}
                    date={review.date}
                    userName={review.userName}
                    rating={review.rating}
                    />
                ))}
            </div>
        </div>

      </div>
    </>
  );
}

export default ProductDetail;