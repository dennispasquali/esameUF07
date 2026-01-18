import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import style from "../PagesStyle/Contacts.module.css";
import RoomIcon from '@mui/icons-material/Room';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import Divider from "@mui/material/Divider";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';
import MapComponent from "./MapComponent";

function Contacts() {

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
    
    return (
        <>
        <NavBar></NavBar>

        <div className={style.body}>
            <div className={style.introduction}>
                <h3>Realizziamo le tue idee su carta.</h3>
                <h6>Hai un progetto grafico o di stampa in mente? Siamo qui per aiutarti <br />
                a sciegliere i materiali migliori e le finiture perfette</h6>
                <div className={style.effect}></div>
            </div>

            <div className={style.info_contacts_column}>
               <ThemeProvider theme={theme}>
                                      
             <ul className={style.info_contacts}>
                            <h6 className={style.info_contacts_title}>I Nostri Recapiti</h6>
                          <div>
                            <div className={style.info_contacts_row}>
                            <RoomIcon color="secondary"></RoomIcon>
                            <h6  className={style.info_contacts_subtitles}>Vieni a Trovarci</h6>
                            </div>
                            
                            <p>Viale dell'Industria 9, 38057 Pergine Valsugana (TN)</p>
                          </div>
                            <Divider></Divider>
                             <div>
                            <div className={style.info_contacts_row}>
                            <LocalPhoneIcon color="secondary"></LocalPhoneIcon>
                            <h6 className={style.info_contacts_subtitles}>Chiamaci</h6>
                            </div>
                            
                            <p>+39 0461 533941</p>
                          </div>
                          <Divider></Divider>
                           <div>
                            <div className={style.info_contacts_row}>
                            <LocalPostOfficeIcon color="secondary"></LocalPostOfficeIcon>
                            <h6 className={style.info_contacts_subtitles}>Scrivici</h6>
                            </div>
                            <p>info@graficapasquali.it</p>
                          </div>
                                <div className={style.social_container}>
                                     <div className={style.social_button}><InstagramIcon /></div>
                                    <div  className={style.social_button}> <FacebookIcon /></div>
                                    <div  className={style.social_button}> <LinkedInIcon /></div>
                                </div>
                               </ul>

                        <div className={style.timetables_card}>
                          <div className={style.timetables_row}>
                            <AccessTimeIcon color="action" />
                            <h6>Orari di Apertura</h6>
                          </div>
                          
                          <p>Lun-Ven: 8:00 - 12:00 / 14:00 - 19:00</p>
                          <p>Sabato: 8:00 - 12:00</p>
                          <p>Domenica: Chiuso</p>
                        </div>

                        <div className={style.quotation_container}>
                          <h5>Richiedi un Preventivo</h5>
                          <p>Compila il modulo qui sotto. Ti risponderemo solitamente entro 24 ore lavorative.</p>
                            <div className={style.quotation_input_row}>
                              <TextField fullWidth label="Nome e Cognome" variant="outlined" placeholder="Mario Rossi" />
                           <TextField fullWidth label="Azienda (Opzionale)" variant="outlined" />
                           <TextField fullWidth type="email" label="Email" variant="outlined" placeholder="mario@email.com" />
                            <TextField  fullWidth label="Telefono" variant="outlined" />
                          

                            </div>
                           <div className={style.last_container}>
                               <TextField
                            className={style.lastInput} 
                        fullWidth 
                        multiline 
                        rows={4} 
                        label="Di cosa hai bisogno?" 
                        placeholder="Descrivi il tuo progetto: biglietti da visita, brochure, quantità..." 
                        variant="outlined" 
                      />
                      <Button 
                        variant="contained" 
                        size="large" 
                        endIcon={<SendIcon />}
                        fullWidth
                        sx={{ mt: 1, bgcolor: 'secondary.main', '&:hover': { bgcolor: '#2563EB' } }}
                      >
                        Invia Richiesta
                      </Button>
                           </div>
                         
                        </div>


                        <div className={style.location}>
                        <h2>Dove Puoi Trovarci</h2>
                          <MapComponent></MapComponent>

                        <p>Viale dell’Industria, 9 Pergine Valsugana (TN)</p>
                        </div>
                               </ThemeProvider>
            </div>
             
        </div>
        <Footer></Footer>
        </>
    )
}

export default Contacts