import type { ICarouselImage } from "../Interfaces/Carousel";
import style from "../ComponentStyle/Carousel.module.css";
import { useEffect, useState, useRef } from "react";
import { CircleRounded } from "@mui/icons-material";
import { grey, amber } from "@mui/material/colors";

function Carousel() {
    const imagesData = [
        { id: 1, url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80", alt: "Sneakers", caption: "Scarpe" },
        { id: 2, url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80", alt: "Cuffie", caption: "Cuffie" },
        { id: 3, url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80", alt: "Orologio", caption: "Orologio" },
        { id: 4, url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80", alt: "Borsa", caption: "Borsa" },
        { id: 5, url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80", alt: "T-shirt", caption: "Maglietta" }
    ];

    const [extendedImages, setExtendedImages] = useState<ICarouselImage[]>([...imagesData]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const nextCopyIndex = useRef(0); 

   
    const [transitionEnabled, setTransitionEnabled] = useState(true);

    // Funzione PURA: crea solo il dato, non tocca lo stato
    function getNextImage(currentList: ICarouselImage[]) {
       
        const originalIndex = nextCopyIndex.current % imagesData.length;
        
        const newImage = { ...imagesData[originalIndex] };
        
        // Assegniamo un ID unico basato sull'ultimo della lista + 1
        // (Usiamo un timestamp o random se la lista fosse vuota, ma qui non lo è mai)
        newImage.id = currentList[currentList.length - 1].id + 1;
        
        // Prepariamo il puntatore per la prossima volta
        nextCopyIndex.current += 1;
        
        return newImage;
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTransitionEnabled(true); // Riattiva l'animazione se era spenta
            setCurrentIndex((prev) => prev + 1);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    // Effect che controlla ESCLUSIVAMENTE l'aggiornamento dell'array
    useEffect(() => {
        // Se siamo arrivati all'ultima immagine disponibile...
        if (currentIndex === extendedImages.length - 1) {
            
            // 1. Aggiungiamo la nuova immagine in fondo
            const nextImg = getNextImage(extendedImages);
            let newArray = [...extendedImages, nextImg];
            let newIndex = currentIndex;

            // 2. LOGICA DI PULIZIA (Anti-Crash)
            // Se l'array supera i 15 elementi, tagliamo i primi 5 per liberare memoria
            if (newArray.length > 15) {
                const elementsToRemove = 5;
                
                // Tagliamo i primi 5
                newArray = newArray.slice(elementsToRemove);
                
                // IMPORTANTE: Dobbiamo spostare l'indice indietro di 5 posizioni!
                // Altrimenti l'utente vedrebbe un salto in avanti.
                newIndex = newIndex - elementsToRemove;
                
                // Disattiviamo momentaneamente l'animazione per rendere il taglio invisibile all'occhio
                setTransitionEnabled(false);
                setCurrentIndex(newIndex);
            }

            setExtendedImages(newArray);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex]); // Dipende solo dall'indice che cambia

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
                {extendedImages.map((img) => (
                    <li key={img.id} className={style.slide}>
                        <img src={img.url} alt={img.alt} />
                    </li>
                ))}
            </ul>

            {/* I PUNTINI VANNO FUORI DALLA UL (SLIDER TRACK) */}
            <div className={style.dotContainer}>
                {imagesData.map((_, index) => (
                    <CircleRounded 
                        key={index} 
                        sx={{ 
                            // Calcolo Modulo per accendere il pallino giusto anche se l'indice è 100
                            color: (currentIndex % imagesData.length) === index ? amber[500] : grey[300],
                            fontSize: '15px',
                            cursor: 'pointer'
                        }} 
                    />
                ))}
            </div>
        </div>
    )
}

export default Carousel;