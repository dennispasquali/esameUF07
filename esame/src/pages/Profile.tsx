import IconButton from "@mui/material/IconButton";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import ScrollBarOrders from "../components/ScrollBarOrders";
import style from "../PagesStyle/Profile.module.css";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import ReceiptIcon from '@mui/icons-material/Receipt';
import Divider from "@mui/material/Divider";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import type { IOrder } from "../Interfaces/Order";

const user = {
    userName: "Dennis Pasquali",
    userAvatar: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
    email: "dennispasquali206@gmail.com"
}



const orders : IOrder[]= [
  { 
    id: "ORD-24-882", date: "14 Gen 2026", 
    title: "1000 Biglietti da Visita Soft Touch", 
    price: "€ 45,00", status: "In Produzione", statusColor: "warning",
    url: "https://picsum.photos/800/600?random=1",
    alt: "Vista panoramica di una montagna innevata" 
  },
  { 
    id: "ORD-24-850", date: "10 Gen 2026", 
    title: "2 Roll-up 85x200 Deluxe", 
    price: "€ 120,00", status: "Spedito", statusColor: "secondary",
    url: "https://picsum.photos/800/600?random=2",
    alt: "Laptop su una scrivania in ufficio moderno" 
  },
  { 
    id: "ORD-23-999", date: "20 Dic 2025", 
    title: "50 Cartelline Portadocumenti", 
    price: "€ 85,50", status: "Consegnato", statusColor: "success",
    url: "https://picsum.photos/800/600?random=3",
    alt: "Tazza di caffè fumante su tavolo di legno" 
  },

   { 
    id: "ORD-24-883", date: "14 Gen 2026", 
    title: "1000 Biglietti da Visita Soft Touch", 
    price: "€ 45,00", status: "In Produzione", statusColor: "warning",
    url: "https://picsum.photos/800/600?random=1",
    alt: "Vista panoramica di una montagna innevata" 
  },
  { 
    id: "ORD-24-851", date: "10 Gen 2026", 
    title: "2 Roll-up 85x200 Deluxe", 
    price: "€ 120,00", status: "Spedito", statusColor: "secondary",
    url: "https://picsum.photos/800/600?random=2",
    alt: "Laptop su una scrivania in ufficio moderno" 
  },
  { 
    id: "ORD-23-1000", date: "20 Dic 2025", 
    title: "50 Cartelline Portadocumenti", 
    price: "€ 85,50", status: "Consegnato", statusColor: "success",
    url: "https://picsum.photos/800/600?random=3",
    alt: "Tazza di caffè fumante su tavolo di legno" 
  },

   { 
    id: "ORD-24-884", date: "14 Gen 2026", 
    title: "1000 Biglietti da Visita Soft Touch", 
    price: "€ 45,00", status: "In Produzione", statusColor: 'warning',
    url: "https://picsum.photos/800/600?random=1",
    alt: "Vista panoramica di una montagna innevata" 
  },
  { 
    id: "ORD-24-852", date: "10 Gen 2026", 
    title: "2 Roll-up 85x200 Deluxe", 
    price: "€ 120,00", status: "Spedito", statusColor: "secondary",
    url: "https://picsum.photos/800/600?random=2",
    alt: "Laptop su una scrivania in ufficio moderno" 
  },
  { 
    id: "ORD-23-1002", date: "20 Dic 2025", 
    title: "50 Cartelline Portadocumenti", 
    price: "€ 85,50", status: "Consegnato", statusColor: "success",
    url: "https://picsum.photos/800/600?random=3",
    alt: "Tazza di caffè fumante su tavolo di legno" 
  },

   { 
    id: "ORD-24-887", date: "14 Gen 2026", 
    title: "1000 Biglietti da Visita Soft Touch", 
    price: "€ 45,00", status: "In Produzione", statusColor: "warning",
    url: "https://picsum.photos/800/600?random=1",
    alt: "Vista panoramica di una montagna innevata" 
  },
  { 
    id: "ORD-24-853", date: "10 Gen 2026", 
    title: "2 Roll-up 85x200 Deluxe", 
    price: "€ 120,00", status: "Spedito", statusColor: "secondary",
    url: "https://picsum.photos/800/600?random=2",
    alt: "Laptop su una scrivania in ufficio moderno" 
  },
  { 
    id: "ORD-23-1003", date: "20 Dic 2025", 
    title: "50 Cartelline Portadocumenti", 
    price: "€ 85,50", status: "Consegnato", statusColor: "success",
    url: "https://picsum.photos/800/600?random=3",
    alt: "Tazza di caffè fumante su tavolo di legno" 
  },
];

function Profile() {

    return (
        <>
            <NavBar></NavBar>
            <div className={style.body}>
                <div className={style.profile}>
                <img className={style.profile_avatar} src={user.userAvatar}></img>

                 <div>
                    <span>{user.userName}</span>
                   <p>{user.email}</p>
                  </div>

                  <div className={style.effect}>

                  </div>
            </div>

            <div className={style.pannels}>
               <ul className={style.dashboardMenu}>
              <div><IconButton
              disableRipple><DashboardIcon /><p>Dashboard</p></IconButton></div>
               <div><IconButton disableRipple><ShoppingBagIcon /><p>I miei Ordini</p></IconButton></div>
                <div><IconButton disableRipple><CloudUploadIcon /><p>Archivio File</p></IconButton></div>
                 <div><IconButton disableRipple><ReceiptIcon /><p>Fatture</p></IconButton></div>
                  <Divider sx={{ my: 1, opacity: 0.5 }} />
                   <div><IconButton disableRipple><SettingsIcon /><p>Impostazioni</p></IconButton></div>
                    <div><IconButton disableRipple  color="error" ><LogoutIcon /><p>Esci</p></IconButton></div>
            </ul>

            {/*TODO fare api per statistiche*/}            
            <ul className={style.stats}>
              <div>
                <p className={style.stat_title}>Ordini Attivi</p>
                <p className={style.stat_number}>2  <ShoppingBagIcon color="warning" /></p>
               
              </div>
              <div>
                <p className={style.stat_title}>File in Verifica</p>
                <p className={style.stat_number}>2 <CloudUploadIcon color="info" /></p>
                
              </div>
              <div>
                <p className={style.stat_title}>Ordini in Spedizione</p>
                <p className={style.stat_number}>2  <LocalShippingIcon color="success" /></p>
               
              </div>
            
            </ul>

            </div>
           
            <div className={style.your_orders}>
                <h2>I Tuoi Ordini</h2>
                <ScrollBarOrders orders={orders} height="450px"></ScrollBarOrders>
            </div>
            
            <div className={style.last_orders}>
                <h2>Ordini Fatti in Precedenza</h2>
                <ScrollBarOrders  orders={orders} height="450px"></ScrollBarOrders>
            </div>
            </div>
            
            <Footer></Footer>
        </>
    )
}

export default Profile;