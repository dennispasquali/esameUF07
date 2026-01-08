
import { useState } from "react";
import Carousel from "../components/Carousel";
import NavBar from "../components/NavBar";
import ProductItem from "../components/ProductItem";
import style from "../PagesStyle/Home.module.css";
import type { IProductItem } from "../Interfaces/ProductItem";
const prodotti = [
  {
    "id": 1,
    "title": "Sony WH-1000XM5",
    "description": "Cuffie Wireless con Noise Cancelling leader del settore, 30 ore di batteria.",
    "image": "https://placehold.co/400x400?text=Sony+Headphones",
    "price": 299.00,
    "oldPrice": "399.00",
    "rating": 4.8,
    "numberOfRatings": 1250
  },
  {
    "id": 2,
    "title": "Apple AirTag (4 Pack)",
    "description": "Tieni traccia delle tue chiavi, portafoglio, valigia, zaino e molto altro.",
    "image": "https://placehold.co/400x400?text=Apple+AirTag",
    "price": 95.00,
    "rating": 4.9,
    "numberOfRatings": 8500
  },
  {
    "id": 3,
    "title": "Kindle Paperwhite 16GB",
    "description": "Ora con schermo da 6,8'' e tonalità della luce regolabile, batteria a lunga durata.",
    "image": "https://placehold.co/400x400?text=Kindle",
    "price": 139.99,
    "oldPrice": "169.99",
    "rating": 4.7,
    "numberOfRatings": 5320
  },
  {
    "id": 4,
    "title": "Logitech MX Master 3S",
    "description": "Mouse Performance Wireless, Scorrimento ultraveloce, Ergonomico, 8K DPI.",
    "image": "https://placehold.co/400x400?text=Logitech+Mouse",
    "price": 99.00,
    "oldPrice": "129.00",
    "rating": 4.8,
    "numberOfRatings": 3100
  },
  {
    "id": 5,
    "title": "Samsung Galaxy S23 Ultra",
    "description": "Smartphone Android, Caricatore incluso, fotocamera 200MP, S Pen integrata.",
    "image": "https://placehold.co/400x400?text=Galaxy+S23",
    "price": 1100.00,
    "oldPrice": "1479.00",
    "rating": 4.6,
    "numberOfRatings": 980
  },
  {
    "id": 6,
    "title": "Nespresso Inissia",
    "description": "Macchina per caffè espresso a capsule, design compatto e leggero.",
    "image": "https://placehold.co/400x400?text=Nespresso",
    "price": 89.00,
    "rating": 4.5,
    "numberOfRatings": 15000
  },
  {
    "id": 7,
    "title": "PlayStation 5 Controller DualSense",
    "description": "Controller wireless per PS5, Feedback aptico, Grilletti adattivi, Microfono integrato.",
    "image": "https://placehold.co/400x400?text=PS5+Controller",
    "price": 64.99,
    "oldPrice": "69.99",
    "rating": 4.8,
    "numberOfRatings": 22000
  },
  {
    "id": 8,
    "title": "LEGO Star Wars Millennium Falcon",
    "description": "Set di costruzioni per adulti e ragazzi, include minifigure classiche.",
    "image": "https://placehold.co/400x400?text=LEGO+Falcon",
    "price": 159.99,
    "rating": 4.9,
    "numberOfRatings": 450
  },
  {
    "id": 9,
    "title": "Fitbit Charge 6",
    "description": "Tracker per fitness e salute, GPS integrato, monitoraggio battito cardiaco.",
    "image": "https://placehold.co/400x400?text=Fitbit",
    "price": 149.00,
    "oldPrice": "179.00",
    "rating": 4.3,
    "numberOfRatings": 1100
  },
  {
    "id": 10,
    "title": "Echo Dot (5ª generazione)",
    "description": "Altoparlante intelligente con Alexa, audio migliorato e design sferico.",
    "image": "https://placehold.co/400x400?text=Echo+Dot",
    "price": 34.99,
    "oldPrice": "59.99",
    "rating": 4.6,
    "numberOfRatings": 45000
  },
  {
    "id": 11,
    "title": "Air Fryer Philips Essential",
    "description": "Friggitrice ad aria XL, tecnologia Rapid Air, touchscreen digitale.",
    "image": "https://placehold.co/400x400?text=Air+Fryer",
    "price": 110.50,
    "oldPrice": "169.99",
    "rating": 4.7,
    "numberOfRatings": 8900
  },
  {
    "id": 12,
    "title": "Apple MacBook Air M2",
    "description": "Laptop 13.6 pollici, chip Apple M2, 8GB RAM, 256GB SSD, Grigio Siderale.",
    "image": "https://placehold.co/400x400?text=MacBook+Air",
    "price": 1099.00,
    "oldPrice": "1349.00",
    "rating": 4.9,
    "numberOfRatings": 2100
  },
  {
    "id": 13,
    "title": "Casio Orologio Vintage",
    "description": "Orologio digitale unisex in acciaio inossidabile, stile retrò.",
    "image": "https://placehold.co/400x400?text=Casio+Watch",
    "price": 29.90,
    "rating": 4.5,
    "numberOfRatings": 12000
  },
  {
    "id": 14,
    "title": "Zaino Herschel Little America",
    "description": "Zaino casual per laptop 15 pollici, ideale per scuola e viaggi.",
    "image": "https://placehold.co/400x400?text=Herschel+Backpack",
    "price": 85.00,
    "oldPrice": "110.00",
    "rating": 4.7,
    "numberOfRatings": 3400
  },
  {
    "id": 15,
    "title": "GoPro HERO12 Black",
    "description": "Action cam impermeabile con video 5.3K60 Ultra HD, foto da 27MP.",
    "image": "https://placehold.co/400x400?text=GoPro",
    "price": 399.00,
    "oldPrice": "449.00",
    "rating": 4.6,
    "numberOfRatings": 850
  },
  {
    "id": 16,
    "title": "Harry Potter e la Pietra Filosofale",
    "description": "Edizione illustrata con copertina rigida, primo libro della saga.",
    "image": "https://placehold.co/400x400?text=Harry+Potter+Book",
    "price": 25.00,
    "rating": 4.9,
    "numberOfRatings": 56000
  },
  {
    "id": 17,
    "title": "Dyson V15 Detect",
    "description": "Aspirapolvere senza filo intelligente, potente e leggero.",
    "image": "https://placehold.co/400x400?text=Dyson+Vacuum",
    "price": 699.00,
    "oldPrice": "799.00",
    "rating": 4.7,
    "numberOfRatings": 1500
  },
  {
    "id": 18,
    "title": "Monitor LG 27'' 4K",
    "description": "Monitor UHD 4K IPS, HDR10, AMD FreeSync, ideale per gaming e lavoro.",
    "image": "https://placehold.co/400x400?text=LG+Monitor",
    "price": 279.00,
    "oldPrice": "349.00",
    "rating": 4.5,
    "numberOfRatings": 900
  },
  {
    "id": 19,
    "title": "Power Bank Anker 20000mAh",
    "description": "Batteria portatile ad alta capacità, ricarica rapida per iPhone e Samsung.",
    "image": "https://placehold.co/400x400?text=Anker+Powerbank",
    "price": 39.99,
    "rating": 4.8,
    "numberOfRatings": 18000
  },
  {
    "id": 20,
    "title": "Adidas Stan Smith",
    "description": "Sneakers unisex bianche e verdi, stile iconico e comfort quotidiano.",
    "image": "https://placehold.co/400x400?text=Adidas+Shoes",
    "price": 75.00,
    "oldPrice": "100.00",
    "rating": 4.6,
    "numberOfRatings": 5600
  },
  {
    "id": 21,
    "title": "Tappetino Yoga Manduka",
    "description": "Tappetino professionale antiscivolo, ecologico e durevole.",
    "image": "https://placehold.co/400x400?text=Yoga+Mat",
    "price": 65.00,
    "rating": 4.7,
    "numberOfRatings": 400
  },
  {
    "id": 22,
    "title": "Moleskine Classic Notebook",
    "description": "Taccuino copertina rigida, pagine a righe, nero, formato Large.",
    "image": "https://placehold.co/400x400?text=Moleskine",
    "price": 18.50,
    "rating": 4.8,
    "numberOfRatings": 7000
  },
  {
    "id": 23,
    "title": "Cavo USB-C a Lightning",
    "description": "Cavo di ricarica rapida certificato Apple, lunghezza 2 metri.",
    "image": "https://placehold.co/400x400?text=USB+Cable",
    "price": 12.99,
    "rating": 4.5,
    "numberOfRatings": 2300
  },
  {
    "id": 24,
    "title": "Chromecast con Google TV",
    "description": "Trasforma la tua TV in Smart TV, streaming 4K HDR e controllo vocale.",
    "image": "https://placehold.co/400x400?text=Chromecast",
    "price": 59.00,
    "oldPrice": "69.99",
    "rating": 4.7,
    "numberOfRatings": 6500
  },
  {
    "id": 25,
    "title": "Ray-Ban Aviator",
    "description": "Occhiali da sole classici, montatura dorata e lenti verdi.",
    "image": "https://placehold.co/400x400?text=RayBan",
    "price": 115.00,
    "oldPrice": "155.00",
    "rating": 4.6,
    "numberOfRatings": 3000
  },
  {
    "id": 26,
    "title": "Borrraccia Termica 500ml",
    "description": "Bottiglia in acciaio inox, mantiene freddo per 24h e caldo per 12h.",
    "image": "https://placehold.co/400x400?text=Water+Bottle",
    "price": 19.90,
    "rating": 4.8,
    "numberOfRatings": 4500
  },
  {
    id: 27,
    title: "Cuffie Bluetooth Sony WH-1000XM5",
    description: "Cuffie con la migliore cancellazione del rumore sul mercato e 30h di batteria.", // CAMPO MANCANTE AGGIUNTO
    image: "https://via.placeholder.com/200",
    price: 299.00,        // ORA È UN NUMERO (senza virgolette)
    oldPrice: "399.00",   // Questo è rimasto stringa come da tua interfaccia
    rating: 4.5,          // Voto (es. 4.5 su 5)
    numberOfRatings: 1205 // Numero di recensioni (separato dal voto)
  },
  {
    id: 28,
    title: "Apple AirTag confezione da 4",
    description: "Tieni traccia delle tue chiavi, portafoglio, valigia, zaino e molto altro.",
    image: "https://via.placeholder.com/200",
    price: 95.00,         // NUMERO
    rating: 4.8,
    numberOfRatings: 850
    // oldPrice è opzionale, qui non c'è
  },
]



function Home() {

  const [endIndex,setEndIndex]=useState<number>(10);
  const [startIndex,setStartIndex]=useState<number>(0);

  const [productSliced,setProductSliced]=useState<IProductItem[]>(prodotti.slice(startIndex,endIndex))

  let numberOfRow=(prodotti.length/10)+1;
  if((prodotti.length/10)===0 && prodotti.length>=10) {
    numberOfRow=prodotti.length/10;
  }
  // let endIndexL=10;
  // let startIndexL=0;

  function sliceNext() {
    // endIndexL=
    // startIndexL=
    if(endIndex-(numberOfRow)*10<10 && endIndex-(numberOfRow)*10>0) {
      setEndIndex(endIndex+(((numberOfRow*10)-endIndex)));
      setStartIndex((startIndex+10));
    }else if(endIndex+10<(numberOfRow)*10 && startIndex+10<(numberOfRow-1)*10) {
      setEndIndex((endIndex+10));
      setStartIndex((startIndex+10));
    }
    
    

    setProductSliced(prodotti.slice(startIndex,endIndex));
  }

  function slicePrev() {
    if(endIndex%10!=0) {
      setEndIndex(endIndex+(((numberOfRow*10)-endIndex)))
    }
    if(endIndex-10>0 && startIndex-10>=0) {
      // endIndexL=(endIndex-10)
      // startIndexL=(startIndex-10)
      setEndIndex(endIndex=>endIndex-10);
      setStartIndex(startIndex=>startIndex-10);
    }
   
    setProductSliced(prodotti.slice(startIndex,endIndex));
    
    
  }

  
  
    return (
        <>
            <NavBar/>
            <div className={style.carousel}>
              <Carousel/>
            </div>
            


        <div className={style.div_products}>
        {/* PRIMO CICLO (5 Righe) */}
       
          
        
              {productSliced.map((prodotto) => (
        <ProductItem 
          key={prodotto.id}
          id={prodotto.id}
          // Passiamo i dati corretti secondo la tua nuova interfaccia
          title={prodotto.title}
          description={prodotto.description} // Nuovo
          image={prodotto.image}
          price={prodotto.price}
          oldPrice={prodotto.oldPrice}
          rating={prodotto.rating}
          numberOfRatings={prodotto.numberOfRatings} // Nuovo
               />
      ))}
            </div>
      

      <button 
            onClick={sliceNext} 
        >
           Avanti ▶
        </button>

        <button 
            onClick={slicePrev} 
              >
           ◀ Indietro
        </button>
            {/* <div className={style.div_products}>
      {prodotti.map((prodotto) => (
        <ProductItem 
          key={prodotto.id}
          id={prodotto.id}
          // Passiamo i dati corretti secondo la tua nuova interfaccia
          title={prodotto.title}
          description={prodotto.description} // Nuovo
          image={prodotto.image}
          price={prodotto.price}
          oldPrice={prodotto.oldPrice}
          rating={prodotto.rating}
          numberOfRatings={prodotto.numberOfRatings} // Nuovo
               />
      ))}
    </div> */}
        </>
    ) 
}

export default Home