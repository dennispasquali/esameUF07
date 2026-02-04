/* eslint-disable react-hooks/refs */

import { useRef, useState } from "react";
import Carousel from "../components/Carousel";
import NavBar from "../components/NavBar";
import ProductItem from "../components/ProductItem";
import style from "../PagesStyle/Home.module.css";
import Button from "@mui/material/Button";
import Footer from "../components/Footer";
import { useFetchApiGet } from "../hooks/useFetchApiGet";
import type { IProductItem } from "../Interfaces/ProductItem";
import CircularProgress from "@mui/material/CircularProgress";
import { useSearchParams } from "react-router-dom";

// Chiave per il session storage
const STORAGE_KEY = 'home_pagination_start';

//FUNZIONI PER GESTIRE IL RITORNO DELL'UTENTE ALLA PAGINA SU CUI ERA SE CAMBIA PAGINA
const getInitialButtons = (currentPage: number): number[] => {
  const storedString = sessionStorage.getItem(STORAGE_KEY);

  if (storedString) {
    try {

      const buttons = JSON.parse(storedString) as number[];


      if (buttons.includes(currentPage)) {
        return buttons;
      }
    } catch (e) {

      console.error("Errore lettura storage", e);
    }
  }

  // SE NON CI SONO I BOTTONI SALVATI IN SESSIONE IMPOSTO DI DEFAULT 1 2 3
  if (currentPage <= 2) return [1, 2, 3];

  return [currentPage - 1, currentPage, currentPage + 1];
};


const saveButtonState = (buttons: number[]) => {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(buttons));
};
function Home() {

  //LOGICA QUERY PARAMS PER LE PAGINE IN MODO CHE SE L'UTENTE VA SU UN PRODUCT ITEM E RITORNA INDIETRO RITORNO NELLA PAGINA DOVE ERA DEI PRODOTTI
  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);

  //ARRAY CHE CONTIENE IL NR PAGINA PER I BOTTONI
  const newPages = useRef<number[]>(getInitialButtons(page));


  //COSTANTI
  const NUMBER_OF_ITEMS = 50;
  const NUMBER_OF_ITEMS_PER_PAGE = 10;
  const NUMBER_OF_BUTTONS = 3;

  //OTTENGO IL NR DI PAGINE
  let numberOfPages = (NUMBER_OF_ITEMS / NUMBER_OF_ITEMS_PER_PAGE) + 1;
  if (Number(((NUMBER_OF_ITEMS / NUMBER_OF_ITEMS_PER_PAGE) % 1).toFixed(2)) === 0.0 || (NUMBER_OF_ITEMS / NUMBER_OF_ITEMS_PER_PAGE) === 0 && NUMBER_OF_ITEMS >= NUMBER_OF_ITEMS_PER_PAGE) {
    numberOfPages = NUMBER_OF_ITEMS / NUMBER_OF_ITEMS_PER_PAGE;
  }


  //IMPOSTO LA CHIAMATA GET DANDOGLI ANCHE UNA KEY PRODUCTS PER IL CACHING
  //NELLE OPZIONI GLI DICO CHE I DATI IN CHACHE SONO VALIDI PER 5 MIN E CHE SE LA CHIAMATA FALLISCE RIPROVA 5 VOLTE
  const { data, isLoading, error } = useFetchApiGet<IProductItem[]>(['products', String(page)], `http://localhost:3000/api/products/${String(page)}`, null, { staleTime: 5000, retry: 5 });


  /**
     * FUNZIONE CHE PERMETTE DI POTER ANDARE AVANTI O INDIETRO NELLE PAGINE CON I BOTTONI
     * * @param val - di quante pagine si vuole andare indietro o in avanti
     * @returns void (aggiorna gli useState)
    */
  function sliceNextOrPrev(val: number) {
    if (page + val <= Math.trunc(numberOfPages) && page + val >= 1 && val !== 0) {
      setSearchParams({ page: String(page + val) });


      const pagel = page + val;
      if (pagel % 2 !== 0 && val >= 1 && newPages.current[2] === pagel && pagel !== 1 && pagel !== 2 && pagel !== Math.trunc(numberOfPages)) {
        const value = 2;
        for (let i = 0; i < NUMBER_OF_BUTTONS; i++) {
          newPages.current[i] = newPages.current[i] + value;
        }
        saveButtonState(newPages.current);

      } else if ((newPages.current[0] === page - 1 && val === -1 && pagel !== 1) || (page % 2 == 0 && val <= -1 && newPages.current[0] === page)) {
        for (let i = 0; i < NUMBER_OF_BUTTONS; i++) {
          newPages.current[i] = newPages.current[i] - 2;
        }

        saveButtonState(newPages.current);
      }
      setPage(page + val);



    }
    
  }




  if (isLoading) {
    return (<CircularProgress className={style.isLoading}></CircularProgress>);
  } else if (data !== null && data !== undefined) {
    const prodotti: IProductItem[] = data;






    
    /**
     * FUNZIONE CHE PERMETTE DI POTER USARE I BOTTONI CON IL NR PAGINA PER ARIVVARE ALLA SUDDETTA PAGINA
     * * @param valButton - il nr pagina del bottone cui si vuole arrivare
     * @returns void (aggiorna gli useState)
    */
    function buttonChangePage(valButton: number) {
      if (page < valButton) {
        sliceNextOrPrev(valButton - page);
      } else {
        sliceNextOrPrev(valButton - page);
      }


    }




    //TSX DELLA PAGINA HOME
    return (
      <>
        <NavBar />
        <div className={style.carousel}>
          <Carousel />
        </div>



        <div className={style.div_products}>


          {/* SEZIONE PRODUCT ITEM */}
          {prodotti.map((prodotto) => (
            <ProductItem

              key={prodotto.id}
              id={prodotto.id}
              title={prodotto.title}
              description={prodotto.description} // Nuovo
              img={prodotto.img}
              price={prodotto.price}
              oldPrice={prodotto.oldPrice}
              rating={prodotto.rating}
              shippingDate={prodotto.shippingDate}
              numberOfRatings={prodotto.numberOfRatings} // Nuovo
              qt={prodotto.qt}
            />
          ))}
        </div>

        {/* SEZIONE PER LA GESTIONE DEI BOTTONI PER LE PAGINE DI PRODOTTI*/}
        {/* ESEMPIO: SE CI SONO 30 PRODOTTI NEL DB METTO I BOTTONI DA 1 A 3 SE CE NE SONO 10 TOLGO I BOTTONI E METTO UN P CON PAG 1 DI 1 */}
        {Math.trunc(NUMBER_OF_ITEMS / 10) >= 1 ? <div className={style.buttons_container}>

          <Button
            size="small"
            variant="contained"
            onClick={() => sliceNextOrPrev(-1)}
          >
            ◀ Indietro
          </Button>
          <Button key={newPages.current[0]} onClick={() => buttonChangePage(newPages.current[0])} variant="contained">
            {newPages.current[0]}

          </Button>
          <Button key={newPages.current[1]} onClick={() => buttonChangePage(newPages.current[1])} variant="contained">
            {newPages.current[1]}

          </Button>
          <Button key={newPages.current[2]} onClick={() => buttonChangePage(newPages.current[2])} variant="contained">
            {newPages.current[2]}

          </Button>
          <Button

            variant="contained"
            onClick={() => sliceNextOrPrev(1)}
          >
            Avanti ▶
          </Button>
          <div className={style.info_page}>
            <p>
              Pag {page} di {Math.trunc(numberOfPages)}
            </p>
          </div>

        </div> : <div className={style.info_page}>
          <p>
            Pag 1 di 1
          </p>
        </div>}



        <Footer />
      </>
    )
  } else {
    //STAMPO EVENTUALI ERRORI NELLA CHIAMATA API PER I PRODOTTI (ONGI PRODOTTO è CHIAMATO PRODUCT 
    // ITEM)
    if (error !== null) {
      console.error("code: " + error.status + " message: " + error?.message + " details: " + error?.details);
    } else {
      console.error("errore in home scononosciuto");
    }

  }
}
export default Home