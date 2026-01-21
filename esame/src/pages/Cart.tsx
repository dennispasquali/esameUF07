import {useState } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import type { CartOrder } from "../Interfaces/CartOrder";
import style from "../PagesStyle/Cart.module.css";
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Button from "@mui/material/Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Divider, InputAdornment, TextField } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';



const initialCart:CartOrder[] =  [
  {
    id: 1,
    title: "Biglietti da Visita Soft Touch",
    details: "350gr • Plastifica Fronte/Retro",
    unitPrice: 45.00,
    quantity: 1,
    url: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=150&q=80",
    alt: "Vista panoramica di una montagna innevata",

  },
  {
    id: 2,
    title: "Volantini A5 Offerta",
    details: "130gr • Patinata Lucida",
    unitPrice: 125.50,
    quantity: 1,
    url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=150&q=80",
     alt: "Vista panoramica di una montagna innevata",

  },
  {
    id: 3,
    title: "Roll-up Deluxe 85x200",
    details: "Struttura alluminio • Telo PVC • Borsa inclusa",
    unitPrice: 60.00,
    quantity: 2,
    url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=150&q=80",
     alt: "Vista panoramica di una montagna innevata",
  }
];
//calcolato dal backend
const shippingCost:number=40;
const freeShipping:number=100;
function Cart() {
    const ivaPerc=22;
    const [items,setItems]=useState<CartOrder[]>(initialCart);
    const [itemQuantity,setItemQuantity]=useState<number[]>(()=> {
        const qt:number[]=[0];
        for (let i = 0; i < items.length; i++) {
            qt[i]=items[i].quantity;
            
        }
        return qt;
    });

     const [itemsPrice,setItemsPrice]=useState<number[]>(()=>{
        const price:number[]=[0];
        for (let i = 0; i < items.length; i++) {
            price[i]=items[i].unitPrice*itemQuantity[i];
            
        }
        return price;
    });

    const [totalPrice,setTotalPrice]=useState<number>(()=>{
        let finalprice:number=0;
        for (let i = 0; i < initialCart.length; i++) {
            finalprice+=itemsPrice[i];
            
        }

        return finalprice;
    });

    const [iva,setIva]=useState<number>(()=>{
       return (totalPrice/100)*ivaPerc;
    })

    const itemQuantityl:number[]=[...itemQuantity];
    const itemsPricel:number[]=[...itemsPrice];
    
    


   
    
   
    function handleQuantity(i:number,qt:number) {
        let diff=totalPrice-items[i].unitPrice*items[i].quantity;
        const newItems=[...items];
       
        if(qt===1) {
           itemQuantityl[i]+=1;
            newItems[i].quantity+=1;
            setItemQuantity(itemQuantityl);
         
           
        } else {
           itemQuantityl[i]-=1;
            newItems[i].quantity-=1;
             setItemQuantity(itemQuantityl);
           
        }


        setItems(newItems);
        diff=diff+itemQuantityl[i]*initialCart[i].unitPrice;
        setTotalPrice(diff);
        itemsPricel[i]=itemQuantityl[i]*items[i].unitPrice;
        setItemsPrice(itemsPricel);
        const ival=(diff/100)*ivaPerc;
        setIva(ival); 
      
        
    } 


    function handleRemove(id:number) {
        const diff=totalPrice-itemsPrice[id];
        const ival=(diff/100)*ivaPerc;
        setIva(ival);
        const newList=items.filter((item,index) => index !== id);
        itemQuantityl[id]=0;
        setItemQuantity(itemQuantityl);
        setTotalPrice(diff);
        const newItemsPrice=itemsPricel.filter((item,index)=> index!=id);
        setItemsPrice(newItemsPrice);
        setItems(newList);
       
    }


    return (
        <>
        <NavBar></NavBar>
        <div className={style.body}>
            <div className={style.introduction}>
                <h2>Il tuo Carrello:</h2>
                <div className={style.effect}>
                </div>
            </div>

            <div className={style.cartColumn}>
                {items.length===0 ? <h2>Il tuo Carrello è vuoto</h2>:<ul className={style.cartOrder_list}>
                    {items.map((order,index:number) => (
                        <div className={style.cartOrder} key={order.id}>
                            <img src={order.url} alt={order.alt}></img>
                            <div className={style.info_order}>
                                <h6 className={style.order_title}>{order.title}</h6>
                                <p className={style.order_quantity}>{order.quantity} pz • {order.details}</p>
                                <p className={style.order_unitPrice}>Prezzo unitario: {order.unitPrice.toFixed(2)}€</p>
                               
                            </div>
                            <div className={style.counter}>
                                <IconButton size="small" onClick={() => handleQuantity(index,-1)} disabled={itemQuantity[index] <= 1}>
                                <RemoveIcon fontSize="small" />
                            </IconButton>
                            <p>{itemQuantity[index]}</p>
                            <IconButton size="small" onClick={() => handleQuantity(index,1)}>
                                <AddIcon fontSize="small" />
                            </IconButton>
                            </div>
                            

                            <p className={style.totalPricePerItem}>{itemsPrice[index].toFixed(2)}€</p>
                             <IconButton color="error" onClick={() => handleRemove(index)} sx={{ '&:hover': { bgcolor: '#fef2f2' } }}>
                          <DeleteOutlineIcon />
                        </IconButton>
                        </div>
                ))}
                </ul>}
            

             <Button startIcon={<ArrowBackIcon />} sx={{ mt: 3, fontWeight: 600, color: 'text.secondary' }}>
                Continua lo shopping
            </Button>

            <div className={style.checkout}>
                <h6>Riepilogo Ordine</h6>
                <div className={style.checkout_row}><p>Subtotale </p><p className={style.subTotal}>{totalPrice.toFixed(2)}€</p></div>
                <div className={style.checkout_row}><p>IVA ({ivaPerc}%) </p><p className={style.iva}>{iva.toFixed(2)}€</p></div>
                <div className={style.checkout_row}><p>Spedizione </p>{totalPrice>freeShipping? <p className={style.shipping_free}>Gratis</p>: <p  className={style.shipping}>{shippingCost}€</p>}</div>
                <Divider></Divider>
                <div className={style.checkout_row}><h6 >Totale: </h6><h4>{(totalPrice+iva).toFixed(2)} €</h4></div>
                 <Button 
                    fullWidth 
                    variant="contained"
                    className={style.checkout_button} 
                    size="large" 
                    sx={{ mt: 4, py: 1.5, borderRadius: 2, fontSize: '1.1rem' }}
                    startIcon={<LockIcon fontSize="small" />}
                >
                    Procedi al Checkout
                </Button>
            </div>

            <div className={style.coupon_container}>
                <h6>Hai un codice promozionale?</h6>
                <div className={style.promotionCode_container}>
                    <TextField 
                                size="small" 
                                placeholder="Codice coupon" 
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LocalOfferIcon fontSize="small" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Button variant="outlined" sx={{ fontWeight: 600 }}>Applica</Button>
                  
                </div>
                
            </div>
            </div>


        </div>
        <Footer></Footer>
        </>
    )
}

export default Cart;