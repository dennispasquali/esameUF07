
import {useRef, useState } from "react";
import Carousel from "../components/Carousel";
import NavBar from "../components/NavBar";
import ProductItem from "../components/ProductItem";
import style from "../PagesStyle/Home.module.css";
import Button from "@mui/material/Button";
import Footer from "../components/Footer";
import { FetchApiGet } from "../hooks/FetchApiGet";
import type { IProductItem } from "../Interfaces/ProductItem";
import CircularProgress from "@mui/material/CircularProgress";








function Home() {
  
  const NUMBER_OF_ITEM_PER_ROW=10;
  const { data, loading, error } = FetchApiGet<IProductItem[]>("http://localhost:3000/api/products");
  const [endIndex,setEndIndex]=useState<number>(NUMBER_OF_ITEM_PER_ROW);
  const [startIndex,setStartIndex]=useState<number>(0);
  const l=3;
  const newPages=useRef<number[]>([1,2,3]);

   

  if(loading) {
    return (<CircularProgress className={style.loading}></CircularProgress>);
  } else if(data!==null) {
      const prodotti:IProductItem[]=data;
    
       function resetCurrentIndexes() {
      let numberOfRow=(prodotti.length/NUMBER_OF_ITEM_PER_ROW)+1;
  if(Number(((prodotti.length/NUMBER_OF_ITEM_PER_ROW) % 1).toFixed(2))===0.0 || (prodotti.length/NUMBER_OF_ITEM_PER_ROW)===0 && prodotti.length>=NUMBER_OF_ITEM_PER_ROW) {
    numberOfRow=prodotti.length/NUMBER_OF_ITEM_PER_ROW;
  }
 
  

    let limit=1;
      
      if(numberOfRow>=3) {
        limit=3;
      } else {
        limit=numberOfRow;
      }
      let ind=0;
      for (let i = 0; i < limit; i++) {
        newPages.current[ind]=i+1;
        ind++;
        
      }
    }
  

  const productSliced=prodotti.slice(startIndex,endIndex);
  let numberOfRow=(prodotti.length/NUMBER_OF_ITEM_PER_ROW)+1;
  if(Number(((prodotti.length/NUMBER_OF_ITEM_PER_ROW) % 1).toFixed(2))===0.0 || (prodotti.length/NUMBER_OF_ITEM_PER_ROW)===0 && prodotti.length>=NUMBER_OF_ITEM_PER_ROW) {
    numberOfRow=prodotti.length/NUMBER_OF_ITEM_PER_ROW;
  }
  

  

  function sliceNext(val:number) {
    val=val*NUMBER_OF_ITEM_PER_ROW
    if(endIndex+val<=(numberOfRow)*NUMBER_OF_ITEM_PER_ROW && startIndex+val<=(numberOfRow-1)*NUMBER_OF_ITEM_PER_ROW) {
      setEndIndex((endIndex+val));
      setStartIndex((startIndex+val));

          const startIndexL=startIndex+val;
           if(numberOfRow-(startIndexL/NUMBER_OF_ITEM_PER_ROW)>3) {
            let index=0;
           for (let i =startIndexL/NUMBER_OF_ITEM_PER_ROW; i <startIndexL/NUMBER_OF_ITEM_PER_ROW+l; i++) {
              newPages.current[index]=i+1;
              index++;
           }
           } else {
            let index=2;
            let i=Math.trunc(numberOfRow);
            for (i; i >Math.trunc(numberOfRow)-3; i--) {
              newPages.current[index]=i;
              index--;
              
            }
           }
      
    }
  }

  function slicePrev(val:number) {
    val=val*NUMBER_OF_ITEM_PER_ROW;
    if(endIndex-val>0 && startIndex-val>=0) {
      setEndIndex(endIndex=>endIndex-val);
      setStartIndex(startIndex=>startIndex-val);
       let endIndexL=endIndex-val;
           if(endIndexL>=NUMBER_OF_ITEM_PER_ROW && endIndex<=((Math.trunc(numberOfRow)+1)*10)-30) {
            endIndexL=endIndex;
            let index=2;
            for (let i =endIndexL/NUMBER_OF_ITEM_PER_ROW; i > (endIndexL/NUMBER_OF_ITEM_PER_ROW-l); i--) {
              newPages.current[index]=i+1;
              index--;
            }
        }
    } 
  }


  function buttonChangePage(valButton:number) {
    if((endIndex/NUMBER_OF_ITEM_PER_ROW)<valButton) {
      sliceNext(valButton-(endIndex/NUMBER_OF_ITEM_PER_ROW));
    } else {
      slicePrev((endIndex/NUMBER_OF_ITEM_PER_ROW)-valButton);
    }

   
  }
  
  
  
  
  
    return (
        <>
            <NavBar/>
            <div className={style.carousel}>
              <Carousel/>
            </div>
            


        <div className={style.div_products}>
       
          
        
        {productSliced.map((prodotto) => (
        <ProductItem 
          reset={resetCurrentIndexes}
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
      
      {prodotti.length>10? <div className={style.buttons_container}>

        <Button
            size="small"
            variant="contained"  
            onClick={()=>slicePrev(1)} 
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
             onClick={()=>sliceNext(1)}
        >
           Avanti ▶
        </Button>
        <div className={style.info_page}>
        <p>
          Pag {Math.trunc(startIndex/10)+1} di {Math.trunc(numberOfRow)}
        </p>
      </div>

      </div> : <div className={style.info_page}>
        <p>
          Pag 1 di 1
        </p>
      </div>}
      
        
        
          <Footer/>
        </>
    ) 
} else {
  console.error("code: "+error?.status+" message: "+error?.message+" details: "+error?.details);
}
}
export default Home