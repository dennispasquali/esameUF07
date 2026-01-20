
import style from "../ComponentStyle/ScrollBarOrders.module.css"
import { useRef, useState } from "react";
import Chip from "@mui/material/Chip";
import type { IOrder } from "../Interfaces/Order";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import ReplayIcon from '@mui/icons-material/Replay';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
interface orderScrollListProps {
    orders: IOrder[];
    height?: string; // Opzionale: per personalizzare l'altezza
}

function ScrollBarOrders({ orders, height = '400px' }: orderScrollListProps) {

    const theme = createTheme({
        palette: {
            background: { default: '#f8f9fa' },
            primary: { main: '#0F172A' }, // Blu Notte (Slate 900)
            secondary: { main: '#3B82F6' }, // Blu Elettrico (Blue 500)
            text: { primary: '#334155', secondary: '#64748B' },
            success: { main: '#10B981' }, // Verde smeraldo
            warning: { main: '#F59E0B' }, // Ambra
        },
});


    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - containerRef.current.offsetLeft);
        setScrollLeft(containerRef.current.scrollLeft);
    };


    const stopDragging = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging || !containerRef.current) return;

        e.preventDefault(); // Previene comportamenti strani di selezione

        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = (x - startX) * 1.5; // Moltiplicatore velocità (es. 1.5x, 2x)


        containerRef.current.scrollLeft = scrollLeft - walk;
    };


    return (
        <div style={{ height }}
            ref={containerRef}
            className={`${style.scroll_container} ${isDragging ? style.cursor_grabbing : style.cursor_grab}`}
            onMouseDown={handleMouseDown}
            onMouseLeave={stopDragging}
            onMouseUp={stopDragging}
            onMouseMove={handleMouseMove}>
                
            {orders.map((order) => (
                <div className={style.single_order} key={order.id}>
                    <img
                    src={order.url}
                    alt={order.alt}
                    className={style.scroll_order_image}
                    loading="lazy" // Ottimizzazione per non caricare tutto subito
                    draggable={false}
                    />
                    <div>
                        <p className={style.order_title}>{order.quantity} {order.title}</p>
                        <span className={style.order_id_date}>{order.id} • {order.date}</span>
                    </div>

                    <div className={style.price_shipping_container}>
                         <ThemeProvider theme={theme}>
                            <Chip 
                            label={order.status} 
                            size="small" 
                            color={order.statusColor} 
                            variant="outlined"
                            sx={{ fontWeight: 'bold', border: 'none', bgcolor: `${order.statusColor === 'warning' ? '#fffbeb' : order.statusColor === 'success' ? '#ecfdf5' : '#eff6ff'}`, color: `${order.statusColor}.main` }}
                                />
                         </ThemeProvider>
                        
                        <p className={style.price}>€ {order.price}</p>
                  
                    </div>
                     
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
                
            ))}
        </div>
    )
}

export default ScrollBarOrders