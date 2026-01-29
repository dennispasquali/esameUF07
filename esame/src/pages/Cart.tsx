import {useEffect, useState } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import type {ICartOrder } from "../Interfaces/CartOrder";
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
import { useNavigate } from "react-router-dom";
import { useFetchApiGet } from "../hooks/useFetchApiGet";
import type { IUserProfile } from "../Interfaces/UserJWT";
import { useFetchApiDelete } from "../hooks/useDelete";
import { useApiPost } from "../hooks/useApiPost";


//calcolato dal backend
const SHIPPING_COST:number=40;
const FREE_SHIPPING:number=100;
const IVAPERC=22;

interface IAddOrRemoveFromCart{
    idOrder:number,
    idUser:number,
    qt:number
}
function Cart() {
    const initialCart:ICartOrder[]=[];
     const token=localStorage.getItem('token');
    const navigate=useNavigate();
    const storedUserString = localStorage.getItem('user'); 
    const userData: IUserProfile= storedUserString ? JSON.parse(storedUserString) : -1;
    const {data,error}=useFetchApiGet<ICartOrder[]>(`http://localhost:3000/api/cart/${userData.id}`,token);
    const { mutate,error:errorCartSubmit} = useApiPost<IAddOrRemoveFromCart,string>(`http://localhost:3000/api/cart/submit`,token);
    const [items,setItems]=useState<ICartOrder[]>(initialCart);
    const { executeDelete, error:errorDelete } = useFetchApiDelete<{ message: string }>();
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
       return (totalPrice/100)*IVAPERC;
    })

    useEffect(()=>{

        if(data!==null && initialCart.length==0) {
            console.log(data);
            setItems(...[data]);
            const qt:number[]=[0];
        for (let i = 0; i < data.length; i++) {
            qt[i]=data[i].quantity;
            
        }
            setItemQuantity(qt)


     const price:number[]=[0];
        for (let i = 0; i < data.length; i++) {
            price[i]=data[i].unitPrice*qt[i];
            
        }
    setItemsPrice(price);


     let finalprice:number=0;
        for (let i = 0; i < data.length; i++) {
            finalprice+=price[i];
            
        }
    setTotalPrice(finalprice)


     setIva(()=>{
       return (finalprice/100)*IVAPERC;
    })
        }
    },[data])

   
 
  
   if(errorCartSubmit) {
    console.error("code: "+error?.status+" message: "+error?.message+" details: "+error?.details);
   }

    if(error) {
        console.error("code: "+error?.status+" message: "+error?.message+" details: "+error?.details);
    }
    if(!token || !userData) {
        navigate("/login");
    } else {
    
   
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
        if(data!==null) {
            const dataToSubmit={
            idOrder: data[i].id,
            idUser: userData.id,
            idProduct: data[i].idProduct,
            qt: qt
        } as IAddOrRemoveFromCart

        console.log(dataToSubmit);
        
       
        
        

        mutate(dataToSubmit, {
        onSuccess: (data) => {
            console.log("Dati ricevuti nella callback:", data);
          

        
        },
        onError: (error) => {
          console.error("code: "+error?.status+" message: "+error?.message+" details: "+error?.details);
         
      }})
        setItems(newItems);
        diff=diff+itemQuantityl[i]*data[i].unitPrice;
        setTotalPrice(diff);
        itemsPricel[i]=itemQuantityl[i]*items[i].unitPrice;
        setItemsPrice(itemsPricel);
        const ival=(diff/100)*IVAPERC;
        setIva(ival); 

      
        }
        
      
        
    } 


    async function handleRemove(id:number) {

        if(data!==null) {
            
        

        const result = await executeDelete(
        `http://localhost:3000/api/cart/delete/item/${data[id].id}`, // URL
        token, // Token (preso dal context o props)
    );

    // 3. Controlli se è andata a buon fine
    if (result.success) {
        console.log("Eliminato con successo!");
        const diff=totalPrice-itemsPrice[id];
        const ival=(diff/100)*IVAPERC;
        setIva(ival);
        const newList=items.filter((_,index) => index !== id);
        itemQuantityl[id]=0;
        setItemQuantity(itemQuantityl);
        setTotalPrice(diff);
        const newItemsPrice=itemsPricel.filter((_,index)=> index!=id);
        setItemsPrice(newItemsPrice);
        setItems(newList);
        
    } else {
        console.error("Errore delete:", errorDelete);
    }

      
        }
        
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
            {data===null || data===undefined || data.length===0 ? <h2>Il tuo Carrello è vuoto</h2>:
            <div className={style.cartColumn}>
                <ul className={style.cartOrder_list}>
                    {items.map((order,index:number) => (
                        <div className={style.cartOrder} key={order.id}>
                            <img src={order.url} alt={order.alt}></img>
                            <div className={style.info_order}>
                                <h6 className={style.order_title}>{order.title}</h6>
                                <p className={style.order_quantity}>{order.quantity} pz • ID Prodotto: {order.idProduct}</p>
                                <p className={style.order_unitPrice}>Prezzo unitario: {order.unitPrice.toFixed(2)}€</p>
                            </div>
                            <div className={style.counter}>
                                <IconButton size="small" onClick={() => handleQuantity(index,-1)} disabled={itemQuantity[index] <= 1}>
                                <RemoveIcon fontSize="small" />
                            </IconButton>
                            <p>{itemQuantity[index]}</p>
                            <IconButton size="small" onClick={() => handleQuantity(index,1)} disabled={itemQuantity[index] >= data[index].qtMax}>
                                <AddIcon fontSize="small" />
                            </IconButton>
                            </div>
                            

                            <p className={style.totalPricePerItem}>{Number(itemsPrice[index]).toFixed(2)}€</p>
                             <IconButton color="error" onClick={() => handleRemove(index)} sx={{ '&:hover': { bgcolor: '#fef2f2' } }}>
                          <DeleteOutlineIcon />
                        </IconButton>
                        </div>
                ))}
                </ul>
            

             <Button startIcon={<ArrowBackIcon />} sx={{ mt: 3, fontWeight: 600, color: 'text.secondary' }}>
                Continua lo shopping
            </Button>

            <div className={style.checkout}>
                <h6>Riepilogo Ordine</h6>
                <div className={style.checkout_row}><p>Subtotale </p><p className={style.subTotal}>{totalPrice.toFixed(2)}€</p></div>
                <div className={style.checkout_row}><p>IVA ({IVAPERC}%) </p><p className={style.iva}>{iva.toFixed(2)}€</p></div>
                <div className={style.checkout_row}><p>Spedizione </p>{totalPrice>FREE_SHIPPING? <p className={style.shipping_free}>Gratis</p>: <p  className={style.shipping}>{SHIPPING_COST}€</p>}</div>
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
    }
        </div>
        <Footer></Footer>
        </>
    )
}
}
export default Cart;