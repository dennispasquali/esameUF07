import type { ICarouselImage } from "../Interfaces/Carousel";
import style from "../ComponentStyle/Carousel.module.css";
import { useEffect, useState, useRef } from "react";
import { CircleRounded } from "@mui/icons-material";
import { grey, amber } from "@mui/material/colors";
import CircularProgress from "@mui/material/CircularProgress";
import { FetchApiGet } from "../hooks/FetchApiGet";

function Carousel() {

    const {data,loading,error}=FetchApiGet<ICarouselImage[]>("http://localhost:3000/api/carousel");
     const [transitionEnabled, setTransitionEnabled] = useState(true);
      const nextCopyIndex = useRef(0);
      const imagesData=useRef(data); 
         const [currentIndex, setCurrentIndex] = useState(0);
     function getNextImage(currentList: ICarouselImage[] | null) {
        if(currentList!=null && data!=null) {
                const originalIndex = nextCopyIndex.current % data.length;
            
            const newImage = { ...data[originalIndex] };
            
            
            newImage.id = currentList[currentList.length - 1].id + 1;
            
            nextCopyIndex.current += 1;
            
            return newImage;
        }
        
    }

    useEffect(() => {
        if(data!==null) {
             const interval = setInterval(() => {
             setCurrentIndex((prev) => prev + 1);
            setTransitionEnabled(true); // Riattiva l'animazione se era spenta
           
        }, 3000);

        return () => clearInterval(interval);
        }
       
    }, [loading]);

    
    if(!data && loading) {
        return (<CircularProgress className={style.loading}></CircularProgress>);
    } else if(imagesData.current!==null && data!==null) {
       
       
        if(currentIndex>=imagesData.current.length) {
            const nextImg = getNextImage(imagesData.current);
            let newArray = [...imagesData.current, nextImg];
             let newIndex = currentIndex;

            if (newArray.length > 15) {
                const elementsToRemove = 5;
                newArray = newArray.slice(elementsToRemove);
                newIndex = newIndex - elementsToRemove;
                
                // Disattiviamo momentaneamente l'animazione per rendere il taglio invisibile all'occhio
                setTransitionEnabled(false);
                setCurrentIndex(newIndex);
            }
            const cleanData = newArray.filter((item): item is ICarouselImage => item !== undefined);
            imagesData.current = cleanData;

        }
       
   
    return (
        <div className={style.carouselContainer}>
            <ul 
                className={style.sliderTrack} 
                style={{ 
                    transform: `translateX(-${currentIndex * 100}%)`,
                    // Se transitionEnabled è false, lo spostamento è istantaneo (0s)
                    transition: transitionEnabled ? 'transform 0.5s ease-in-out' : 'none'
                }}
            >
                {imagesData.current.map((img) => (
                    <li key={img.id} className={style.slide}>
                        <img src={img.img} alt={img.alt} />
                    </li>
                ))}
            </ul>

            {/* I PUNTINI VANNO FUORI DALLA UL (SLIDER TRACK) */}
            <div className={style.dotContainer}>
                {data.map((_, index) => (
                    <CircleRounded 
                        key={index} 
                        sx={{ 
                            // Calcolo Modulo per accendere il pallino giusto anche se l'indice è 100
                            color: (currentIndex % data.length) === index ? amber[500] : grey[300],
                            fontSize: '15px',
                            cursor: 'pointer'
                        }} 
                    />
                ))}
            </div>
        </div>
    )
} else if(data!==null) {
        imagesData.current=data;
    } else {
        console.error(error);
    }
}

export default Carousel;