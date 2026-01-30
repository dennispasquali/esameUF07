import * as IconsPayment from "../assets/payment_methods";
import style from "../ComponentStyle/Footer.module.css";
import * as Social from "../assets/social";
import { IconButton } from "@mui/material";
import Logo from '../assets/logo_grafica-pasquali_bianco.png';


//COMPONENTE FOOTER
function Footer() {

    return (
        <div className={style.footer}>
            <div className={style.firstRow}>

                <div className={style.logo}>
                    <img src={Logo}></img>
                    <div className={style.info}>
                        <p className={style.description}>
                            Viale dell’Industria, 9 Pergine Valsugana <br />
                            T. 0461.533941 – T. 0461.849434 – T. 0461.849230 <br />
                            info@graficapasquali.it | info@lookprint.it <br />
                            CF e PI 01476250228
                        </p>


                        <p className={style.copyright}>GRAFICA PASQUALI © 2020 All Rights Reserved</p>
                    </div>

                </div>

                <div>
                    <h2>Metodi di Pagamento</h2>
                    <div className={style.paymentMethod}>
                        {Object.values(IconsPayment).map((iconaSrc, index) => (
                            <img key={index} src={iconaSrc} alt="Metodo di pagamento" width="50" />
                        ))}
                    </div>


                    <h4>domande?</h4>

                    <h1>+39 0461 533941</h1>
                </div>

                <div className={style.social}>
                    <h2>Seguici</h2>
                    {Object.values(Social).map((icon, index) =>
                        <IconButton className={style.socialBtn} data-social={index+Object.values(IconsPayment).length} aria-label="apri menu">
                            <img src={icon} key={index+Object.values(Social).length+Object.values(IconsPayment).length} alt="icona" style={{ width: 24, height: 24 }} />
                        </IconButton>
                    )}
                </div>
            </div>
            <div className={style.secondRow}><p><a href="https://graficapasquali.com/termini-e-condizioni/">Termini e condizioni</a></p>
                <p><a href="">Cataloghi</a></p>
                <p><a href="">Guida ai tessuti</a></p>
                <p><a href="">Come personalizzare</a></p>
                <p><a href="">Privacy &amp; Cookie Policy</a></p>
            </div>

        </div>
    )
}

export default Footer;