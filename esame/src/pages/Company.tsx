
import Card from "@mui/material/Card"
import style from "../PagesStyle/Company.module.css"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import MapComponent from "./MapComponent"

function Company() {
    const employers = [
  {
    "id": 1,
    "name": "Paolo",
    "description": "Cuffie Wireless con Noise Cancelling leader del settore, 30 ore di batteria.",
    "role": "co-founder",
  },
  {
    "id": 2,
    "name": "Silvia",
    "description": "Cuffie Wireless con Noise Cancelling leader del settore, 30 ore di batteria.",
    "role": "co-founder",
  },
  {
    "id": 3,
    "name": "Silvano",
    "description": "Cuffie Wireless con Noise Cancelling leader del settore, 30 ore di batteria.",
    "role": "co-founder",
  },
  {
    "id": 4,
    "name": "Veronica",
    "description": "Cuffie Wireless con Noise Cancelling leader del settore, 30 ore di batteria.",
    "role": "co-founder",
  }
]

    return (
      <>
      <NavBar/>
      <div className={style.video}>
        <video muted autoPlay loop >
        <source src="https://graficapasquali.com/wp-content/uploads/2021/05/a_1.mp4" type="video/mp4" ></source>
     </video>

      </div>
     
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
        <div className={style.card_container}>
            
            {employers.map((emp)=>(
                <Card sx={{ maxWidth: 345 }} key={emp.id}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  image="/static/images/cards/contemplative-reptile.jpg"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {emp.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {emp.description}
                  </Typography>
                  <Typography>
                    {emp.role}
                  </Typography>
                </CardContent>
              </Card> 
            ))}
            
            

        </div>

        <div className={style.location}>
          <h2>Dove Puoi Trovarci</h2>
            <MapComponent></MapComponent>

          <p>Viale dell’Industria, 9 Pergine Valsugana (TN)</p>
          </div>  
      
            <Footer/>
      </>
           
    )
}

export default Company