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
import type { IUserProfile } from "../Interfaces/UserJWT";
import { useNavigate } from "react-router-dom";
import { useFetchApiGet } from "../hooks/useFetchApiGet";
import CircularProgress from "@mui/material/CircularProgress";


//COMPONENTE PAGINA PROFILE
function Profile() {
  //CHIAMATA API PER GLI ORDINI IN ARRIVO (CORRENTI)
  const { data: toArriveOrders,isLoading: toArriveOrdersLoading, error: toArriveOrdersError } = useFetchApiGet<IOrder[]>(['orders_toArrive_profile'],"http://localhost:3000/api/orders/toArrive", localStorage.getItem("token"),{staleTime: 5000,retry: 5});
  //CHIAMATA API PER GLI ORDINI PASSATI
  const { data: arrivedOrders,isLoading: arrivedOrdersLoading, error: arrivedOrdersError } = useFetchApiGet<IOrder[]>(['orders_arrivedOrders_profile'],"http://localhost:3000/api/orders/arrived", localStorage.getItem("token"),{staleTime: 5000,retry: 5});

  const navigate = useNavigate();
  let activeOrders: number = 0;
  let inShippingOrders: number = 0;

  //RECUPERO DATI UTENTE
  const storedUserString = localStorage.getItem('user');
  const user: IUserProfile | null = storedUserString ? JSON.parse(storedUserString) : null;

  //SE L'UTENTE NON è REGISTRATO LO REINDIRIZZO VERSO IL LOGIN
  if (!user || !localStorage.getItem("token")) {
    navigate("/login");
  } else {

    //TROVO IL NR DI ORDINI ATTIVI E IN SPEDIZIONE
    if (toArriveOrders !== null && toArriveOrders!==undefined) {
      activeOrders = toArriveOrders.length;
    }

    if (toArriveOrders !== null && toArriveOrders!==undefined) {
      let count: number = 0;
      toArriveOrders.map((o) => {
        if (o.status === "Spedito") {
          count++;
        }
      })

      inShippingOrders = count;

    }


    return (
      <>
        <NavBar></NavBar>
        <div className={style.body}>

          {/* SEZIONE DI INTRODUZIONE */}
          <div className={style.profile}>
            {user.imgProfile ? <img className={style.profile_avatar} src={user.imgProfile}></img> : <img className={style.profile_avatar} src="//external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F036%2F280%2F651%2Flarge_2x%2Fdefault-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg&f=1&nofb=1&ipt=e13129a2a92bcc094263a9986fc65034cf7d079677dce4062b0d3f77716caf6e"></img>}

            <div>
              <span>{user.name + " " + user.surname}</span>
              <p>{user.email}</p>
            </div>

            <div className={style.effect}>

            </div>
          </div>

          <div className={style.pannels}>
            {/* MENU DASHBOARD */}
            <ul className={style.dashboardMenu}>
              <div><IconButton
                disableRipple><DashboardIcon /><p>Dashboard</p></IconButton></div>
              <div><IconButton disableRipple><ShoppingBagIcon /><p>I miei Ordini</p></IconButton></div>
              <div><IconButton disableRipple><CloudUploadIcon /><p>Archivio File</p></IconButton></div>
              <div><IconButton disableRipple><ReceiptIcon /><p>Fatture</p></IconButton></div>
              <Divider sx={{ my: 1, opacity: 0.5 }} />
              <div><IconButton disableRipple><SettingsIcon /><p>Impostazioni</p></IconButton></div>
              <div><IconButton disableRipple color="error" ><LogoutIcon /><p>Esci</p></IconButton></div>
            </ul>

            {/* SEZIONE STATISTICHE */}
            {inShippingOrders !== 0 && activeOrders !== 0 ? <ul className={style.stats}>
              <div>
                <p className={style.stat_title}>Ordini Attivi</p>
                <p className={style.stat_number}>{activeOrders} <ShoppingBagIcon color="warning" /></p>

              </div>
              <div>
                <p className={style.stat_title}>File in Verifica</p>
                <p className={style.stat_number}>2 <CloudUploadIcon color="info" /></p>

              </div>
              <div>
                <p className={style.stat_title}>Ordini in Spedizione</p>
                <p className={style.stat_number}>{inShippingOrders} <LocalShippingIcon color="success" /></p>

              </div>

            </ul> : <ul className={style.stats}>
              <div>
                <p className={style.stat_title}>Ordini Attivi</p>
                <p className={style.stat_number}>0 <ShoppingBagIcon color="warning" /></p>

              </div>
              <div>
                <p className={style.stat_title}>File in Verifica</p>
                <p className={style.stat_number}>0 <CloudUploadIcon color="info" /></p>

              </div>
              <div>
                <p className={style.stat_title}>Ordini in Spedizione</p>
                <p className={style.stat_number}>0 <LocalShippingIcon color="success" /></p>

              </div>

            </ul>}


          </div>

          {/* SEZIONE ORDINI */}
          <div className={style.your_orders}>
            <h2>I Tuoi Ordini</h2>
            {toArriveOrdersLoading===true ? <CircularProgress className={style.loading}></CircularProgress> : ""}
            {toArriveOrders != null && toArriveOrders?.length !== 0 ? <ScrollBarOrders orders={toArriveOrders} height="450px"></ScrollBarOrders> : <h3>Non ci sono ordini in stato di arrivo</h3>}
            {toArriveOrdersError ? <h3>C'è stato un errore nella visualizzazione dei suoi ordini</h3> : ""}
          </div>

          <div className={style.last_orders}>
            <h2>Ordini Fatti in Precedenza</h2>
            {arrivedOrdersLoading===true ? <CircularProgress className={style.loading}></CircularProgress> : ""}
            {arrivedOrders != null && arrivedOrders?.length !== 0 ? <ScrollBarOrders orders={arrivedOrders} height="450px"></ScrollBarOrders> : <h3>Non ci sono ordini passati</h3>}
            {arrivedOrdersError ? <h3>C'è stato un errore nella visualizzazione dei suoi ordini passati</h3> : ""}
          </div>
        </div>

        <Footer></Footer>
      </>
    )
  }


}
export default Profile;