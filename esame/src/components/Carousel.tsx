/* eslint-disable react-hooks/refs */

import type { ICarouselImage } from "../Interfaces/Carousel";
import style from "../ComponentStyle/Carousel.module.css";
import { useEffect, useState, useRef } from "react";
import { CircleRounded } from "@mui/icons-material";
import { grey, amber } from "@mui/material/colors";
import CircularProgress from "@mui/material/CircularProgress";
import { useFetchApiGet } from "../hooks/useFetchApiGet";


//COMPONENTE CAROSELLO
function Carousel() {

    //CHIAMATA API PER PRENDERE LE IMMAGINI DEL CAROSELLO
    //NELLE OPZIONI GLI DICO CHE I DATI IN CHACHE SONO VALIDI PER 5 MIN E CHE SE LA CHIAMATA FALLISCE RIPROVA 5 VOLTE
    const { data, isLoading, error} = useFetchApiGet<ICarouselImage[]>(['carousel'], "http://localhost:3000/api/carousel", null, { staleTime: 5000, retry: 5 });
    //USE STATE PER ABILITARE/DISABILITARE LA TRANSIZIONE
    const [transitionEnabled, setTransitionEnabled] = useState(true);
    //INDICE IMMAGINE MOSTRATA
    const [currentIndex, setCurrentIndex] = useState(0);
    //INDICE IMMAGINE DA SCORRERE
    const nextCopyIndex = useRef(0);
    //ARRAY DI IMMAGINI

    const imagesData = useRef(data);

    /**
     * FUNZIONE CHE SI OCCUPA DI RITORNARE IL PROSSIMO OGGETTO IMAGINE CHE BISOGNA MOSTRARE CON ID DIVERSO
     * * @param currentList - LISTA DI IMMAGINI DA CUI è COMPOSTO IL CAROSELLO
     * @returns ICarouselImage RITORNA ICarouselImage
    */
    function getNextImage(currentList: ICarouselImage[]): ICarouselImage {

        const originalIndex = nextCopyIndex.current % data!.length;
        const newImage = { ...data![originalIndex] };
        newImage.id = currentList![currentList!.length - 1].id + 1;
        nextCopyIndex.current += 1;

        return newImage;


    }


    //USE EFFECT CHE OGNI 3SEC AGGIORNA L'INDICE PER PASSARE ALLA PROSSIMA IMMAGINE E ABILITA L'ANIMAZIONE
    useEffect(() => {
        if (data !== null) {
            const interval = setInterval(() => {
                setCurrentIndex((prev) => prev + 1);
                setTransitionEnabled(true); // Riattiva l'animazione se era spenta

            }, 3000);

            return () => clearInterval(interval);
        }

    }, [data]);


    if (!data && isLoading) {
        return (<CircularProgress className={style.isLoading}></CircularProgress>);
    } else if (imagesData.current !== null && data !== null && data !== undefined && imagesData.current !== undefined) {

        //CODICE CHE SI OCCUPA DI AGGIORNARE LA LISTA DI IMMAGINI DA MOSTRARE RICHIAMANDO LE VARIE FUNZIONI E SI OCCUPA ANCHE OGNI 15 IMMAGINI IN LISTA DI TOGLIERE LE ULTIME 5 PER NON APPESANTIRE LA PAGINA
        if (currentIndex >= imagesData.current.length) {
            const nextImg = getNextImage(imagesData.current);
            let newArray = [...imagesData.current, nextImg];
            let newIndex = currentIndex;

            if (newArray.length > 15) {
                const elementsToRemove = 5;
                newArray = newArray.slice(elementsToRemove);
                newIndex = newIndex - elementsToRemove;

                // DISATTIVA L'ANIMAZIONE PER RENDERE IL TAGLIO INVISIBILE ALL'OCCHIO
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
                    {/* SEZIONE IMMAGINI CHE SCORRONO */}
                    {imagesData.current.map((img) => (
                        <li key={img.id} className={style.slide}>
                            <img src={img.img} alt={img.alt} />
                        </li>
                    ))}
                </ul>

                {/* SEZIONE CON I PUNTINI GIALLI CHE SI ANIMANO */}
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
    } else if (data !== null) {
        //INIZIALIZZO LA LISTA IMMAGINI NON APPENA DATA MI VIENE RESTITUITO DAL BACKEND
        imagesData.current = data;
    } else {
        //STAMPO EVENTUALI ERRORI
        if (error !== null) {
            console.error("code: " + error?.status + " message: " + error?.message + " details: " + error?.details);
        } else {
            console.error("errore in home scononosciuto");
        }
    }
}

export default Carousel;