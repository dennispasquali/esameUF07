import style from "../ComponentStyle/ScrollBarOrders.module.css"
import { useRef, useState } from "react";
import Chip from "@mui/material/Chip";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import ReplayIcon from '@mui/icons-material/Replay';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import React from "react";
import type { IScrollBarOrders } from "../Interfaces/ScrollBarOrders";

//COMPONENTE PER FARE LA SCROLLBAR ORIZZONTALE IN PROFILE CHE PRENDE IN INPUT I DATI DEGLI ORDINI ATTIVI O PASSATI DA MOSTRARE E L'ALTEZZA  
function ScrollBarOrders({ orders, height = '400px' }: IScrollBarOrders) {

    //PALETTE COLORI PER LE LABEL DI REACT MATERIAL
    const theme = createTheme({
        palette: {
            background: { default: '#f8f9fa' },
            primary: { main: '#9ba8c5' }, 
            secondary: { main: '#3B82F6' }, 
            text: { primary: '#334155', secondary: '#64748B' },
            success: { main: '#10B981' },
            warning: { main: '#F59E0B' },
        },
    });

    //USE STATE PER CAPIRE SE L'UTENTE TRASCINA LE IMMAGINI NELLA SCROLLBAR
    const [isDragging, setIsDragging] = useState(false);
    //USE STATE PER CAPIRE DA CHE POSIZIONE DEVONO PARTIRE LE IMMAGINI CHE VENGONO MOSTRATE
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    //RIFERIMENTO AL CONTAINER DELLA SCROLLBAR
    const containerRef = useRef<HTMLDivElement>(null);
    //TIPO CON I NOMI DI COLORI CHE REACT MATERIAL ACCETTA
    type ChipColor = "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning";


    /**
     * FUNZIONE CHE SI OCCUPA DI AGGIORNARE LA POSIZIONE DELLE IMMAGINI DELLA SCROLLBAR QUANDO IL MOUSE VIENE RILASCIATO
     * * @param e - EVENTO MOUSE DELLA SCROLLBAR
     * @returns void (aggiorna la posizione delle immagini nella scollbar negli usestate)
    */
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - containerRef.current.offsetLeft);
        setScrollLeft(containerRef.current.scrollLeft);
    };


    /**
     * FUNZIONE CHE SI PASSATA UNA STRINGA DI RITORNARE IL TIPO CORRETTO DI COLORE PER LE LABEL DI REACT MATERIAL
     * * @param status: string  - STRINGA CHE VIENE PASSATA PER OTTENERE IL COLORE REACT MATERIAL CORRISPONDENTE
     * @returns string - COLORE REACT MATERIAL CORRISPONDENTE
    */
    const getStatusColor = (status: string): ChipColor => {
        switch (status) {
            case 'Spedito':
                return 'secondary';
            case 'In produzione':
                return 'warning';
            case 'Cancellato':
                return 'error';
            case 'Consegnato':
                return 'success';
            default:
                return 'default';
        }
    }

    //FUNZIONE CHIAMATA PER SETTTARE IL DRAGGING DELL'UTENTE SULLA SCROLLBAR A FALSE
    const stopDragging = () => {
        setIsDragging(false);
    };


    /**
     * FUNZIONE CHE QUANDO MUOVO IL MOUSE MUOVE LE IMMAGGINI DELLA SCROLLBAR
     * * @param e: React.MouseEvent  - EVENTO MOUSE CHE SERVE PER CAPIRE DI QUANTO SCROLLARE LE IMMAGINI SCROLLBAR
     * @returns void -
    */
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !containerRef.current) return;
            e.preventDefault(); // Previene comportamenti strani di selezione
            const x = e.pageX - containerRef.current.offsetLeft;
            const walk = (x - startX) * 1.5; // Moltiplicatore velocità (es. 1.5x, 2x)
            containerRef.current.scrollLeft = scrollLeft - walk;
    };


    return (

        // CONTAINER SCROLLBAR
        <div style={{ height }}
            ref={containerRef}
            className={`${style.scroll_container} ${isDragging ? style.cursor_grabbing : style.cursor_grab}`}
            onMouseDown={handleMouseDown}
            onMouseLeave={stopDragging}
            onMouseUp={stopDragging}
            onMouseMove={handleMouseMove}>
            

            {/* SEZIONE CHE MOSTRA I DATI DEGLI ORDINI */}
            {orders.map((order) => (
                <React.Fragment key={order.id}>
                   
                        <div className={style.single_order} key={order.id}>
                            <div className={style.single_order_img_container}>
                                <img
                                src={order.product.img}
                                alt={order.product.title}
                                className={style.scroll_order_image}
                                loading="lazy" // Ottimizzazione per non caricare tutto subito
                                draggable={false}
                                />
                            </div>
                           

                            <div>
                                <p className={style.order_title}>{order.qt} {order.product.title}</p>
                                <span className={style.order_id_date}>ID Ordine {order.id} • {new Date(order.date).toLocaleDateString('it-IT')}</span>
                            </div>

                            {/* SEZIONE LABEL */}
                            <div className={style.price_shipping_container}>
                                <ThemeProvider theme={theme}>
                                    <Chip
                                        label={order.status}
                                        size="small"
                                        color={getStatusColor(order.status)}
                                        variant="outlined"
                                        sx={{ fontWeight: 'bold', border: 'none', bgcolor: `${getStatusColor(order.status) === 'warning' ? '#fffbeb' : getStatusColor(order.status) === 'success' ? '#ecfdf5' : '#eff6ff'}`, color: `${getStatusColor(order.status)}.main` }}
                                    />
                                </ThemeProvider>

                                <p className={style.price}>€ {order.product.price}</p>
                            </div>

                            {/* SEZIONE BOTTONI */}
                            <div className={style.shipping_reorder_div}>
                                <Button
                                    variant="text"
                                    size="small"
                                    startIcon={<ReplayIcon />}
                                    sx={{ color: 'text.secondary' }}
                                >
                                    Riordina
                                </Button>
                                <Button
                                    variant="text"
                                    size="small"
                                    startIcon={<LocalShippingIcon />}
                                    sx={{ color: 'text.secondary' }}
                                >
                                    Visualizza il tracking
                                </Button>
                            </div>
                        </div>

                   
                </React.Fragment>
            ))}
        </div>
    )
}

export default ScrollBarOrders