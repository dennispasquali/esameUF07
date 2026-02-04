
import Card from "@mui/material/Card"
import style from "../PagesStyle/Company.module.css"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import MapComponent from "../components/MapComponent"
import { useFetchApiGet } from "../hooks/useFetchApiGet";
import type { IEmployee } from "../Interfaces/Employee"

//COMPONENTE PER LA PAGINA DELL AZIENDA
function Company() {
  //LISTA IMPIEGATI
  const {data}=useFetchApiGet<IEmployee[]>(['employee'],"http://localhost:3000/api/employee",null,{staleTime: 5000,retry: 5});
  console.log(data);
  return (
    <>
      <NavBar />

      {/* SEZIONE VIDEO */}
      <div className={style.video}>
        <video muted autoPlay loop >
          <source src="https://graficapasquali.com/wp-content/uploads/2021/05/a_1.mp4" type="video/mp4" ></source>
        </video>
      </div>


      {/* SEZIONE STORIA */}
      <div className={style.history}>
        <h2> CHI SIAMO</h2>
        <p>
          Siamo un’azienda con sede in Trentino, presente dal 1995 nel mercato della produzione di stampati e della comunicazione visiva.
        </p>
        <p>
          Sempre con un occhio di riguardo alle continue evoluzioni ed innovazioni del mercato e  grazie alla nostra professionalità ed esperienza maturata in vent’anni di attività, siamo in grado di fornire un ampio ventaglio di prodotti in vari materiali, carta, pvc, plexiglass…

        </p>
        <p>
          Puoi inviarci il tuo file da stampare direttamente, oppure scegliere tra i nostri vari modelli, che potrai comodamente personalizzare con i tuoi dati, utilizzando il nostro programma on-line.
        </p>

        <p>
          Stampiamo su macchinari sia offset che digitali, riuscendo ad ottenere un ottimo rapporto qualità prezzo …scegli tra i nostri prodotti e… buona stampa on-line!
        </p>

      </div>

      {/* SEZIONE CARD CON I DIPENDENTI */}
      <div className={style.card_container}>
        {data!==null && data!==undefined? data.map((emp) => (
          <Card sx={{ maxWidth: 345 }} key={emp.id}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image={emp.img}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {emp.name+" "+emp.surname}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {emp.task}
              </Typography>
              <Typography>
                {emp.role}
              </Typography>
            </CardContent>
          </Card>
        )):""}
      </div>
      
      {/* SEZIONE MAPPA CON INFO */}
      <div className={style.location}>
        <h2>Dove Puoi Trovarci</h2>
        <MapComponent></MapComponent>

        <p>Viale dell’Industria, 9 Pergine Valsugana (TN)</p>
      </div>

      <Footer />
    </>

  )
}

export default Company