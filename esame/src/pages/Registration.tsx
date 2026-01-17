import TextField from "@mui/material/TextField";
import style from "../PagesStyle/Registration.module.css";
import Button from "@mui/material/Button";
import { useState } from "react";
import { EmailValidation } from "../hooks/EmailValidation";


function Registration() {
    const [password,setPwd]=useState<string>();
    const { email, invalidEmailMessage, onChange } = EmailValidation();
    const [riconfermationPwd,setRiconfermationPwd]=useState<string>("");
    const [invalidRiconfermationMessage,setInvalidRiconfermationMessage]=useState<string>("");
    const [telephoneNumber,setTelephoneNumber]=useState<string>("");
    const [prefix,setPrefix]=useState<number | null>(39);
    const [name,setName]=useState<string>("");
    const [surname,setSurname]=useState<string>("");
    const [country,setCountry]=useState<string>("");
    const [street,setStreet]=useState<string>("");
    const [civic,setCivic]=useState<number | null>();
    const [cap,setCap]=useState<string>("");
    const [city,setCity]=useState<string>("");
    const [invalidPrefix,setInvalidPrefix]=useState<string>("");
    const [invalidCivic,setInvalidCivic]=useState<string>("");


    function handlePrefix(prefix:string) {
        const n=Number(prefix);
        if(!Number.isNaN(n) && n>0) {
            setPrefix(Number(prefix));
            setInvalidPrefix("");
        } else {
            setPrefix(null);
            setInvalidPrefix("Prefisso non valido");
        }

            
    }

    function handleCivic(c:string) {
        const civ=Number(c);
        if(!Number.isNaN(c) && civ>0) {
            setInvalidCivic("");
            setCivic(civ);
        } else {
            setCivic(null);
            setInvalidCivic("civico non valido");
        }
    }


    function handleRiconfermationFirst(pwd:string) {
        setPwd(pwd);
        if(pwd!=riconfermationPwd) {
            setInvalidRiconfermationMessage("le password non coincidono");
        } else {
            setInvalidRiconfermationMessage("");
        }
    }
    function handleRiconfermation(pwdConfirmed:string) {
        setRiconfermationPwd(pwdConfirmed);
        if(password!=pwdConfirmed) {
            setInvalidRiconfermationMessage("le password non coincidono");
        } else {
            setInvalidRiconfermationMessage("");
        }
    }


    return (
        <>
       <div className={style.form}>
        <div className={style.login_header}>
        <h2>Benvenuto</h2>
        <p>Fai il login nel tuo account</p>
       </div>
       
       <form>

        <div className={style.form_group}>
          <label>Nome:</label>
          <TextField
           className={style.textField}
          required
          id="outlined-required"
          label="Required"
          type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
        
        />

        <div className={style.form_group}>
          <label>Cognome:</label>
          <TextField
           className={style.textField}
          required
          id="outlined-required"
          label="Required"
          type="text" 
            value={surname} 
            onChange={(e) => setSurname(e.target.value)} 
        
        />   
        </div>


        
        
        </div>
        
        <div className={style.form_group}>
          <label>Email:</label>
          <TextField
          className={style.textField}
          required
          id="outlined-required"
          label="Required"
          type="email"
          value={email}
          onChange={(e)=>onChange(e.target.value)} 
        />
          {invalidEmailMessage!="" && <span className={style.invalidLabel}>{invalidEmailMessage}</span>}
        </div>
        <div className={style.form_group}>
          <label>Password:</label>
          <TextField
           className={style.textField}
          required
          id="outlined-required"
          label="Required"
          type="password" 
            value={password} 
            onChange={(e) => handleRiconfermationFirst(e.target.value)}
          
        />
        </div>

        <div className={style.form_group}>
          <label>Riconferma Password:</label>
          <TextField
           className={style.textField}
          required
          id="outlined-required"
          label="Required"
          type="password" 
            value={riconfermationPwd} 
              onChange={(e) => handleRiconfermation(e.target.value)} 
        
        />
          {invalidRiconfermationMessage!="" && <span className={style.invalidLabel}>{invalidRiconfermationMessage}</span>}
        </div>

        <div className={style.row}>
            <div className={style.form_group}>
          <label>Prefisso:</label>
          <TextField
           className={style.textField}
          required
          id="outlined-required"
          label="Required"
          type="text" 
            value={prefix} 
            onChange={(e) => handlePrefix(e.target.value)} 
        
        />
        {invalidPrefix!="" && <span className={style.invalidLabel}>{invalidPrefix}</span>}
        </div>
         <div className={style.form_group}>
          <label>Numero di Telefono:</label>
          <TextField
           className={style.textField}
          required
          id="outlined-required"
          label="Required"
          type="text" 
            value={telephoneNumber} 
            onChange={(e) => setTelephoneNumber(e.target.value)} 
        
        />
          
        </div>

        </div>
          


        <div className={style.form_group}>
          <label>Paese:</label>
          <TextField
           className={style.textField}
          required
          id="outlined-required"
          label="Required"
          type="text" 
            value={country} 
            onChange={(e) => setCountry(e.target.value)} 
        
        />
        
        </div>


         <div className={style.form_group}>
          <label>Citta:</label>
          <TextField
           className={style.textField}
          required
          id="outlined-required"
          label="Required"
          type="text" 
            value={city} 
            onChange={(e) => setCity(e.target.value)} 
        
        />
        
        </div>


        <div className={style.form_group}>
          <label>Cap:</label>
          <TextField
           className={style.textField}
          required
          id="outlined-required"
          label="Required"
          type="text" 
            value={cap} 
            onChange={(e) => setCap(e.target.value)} 
        
        />

        <div className={style.row}>
        <div className={style.form_group}>
          <label>Via:</label>
          <TextField
           className={style.textField}
          required
          id="outlined-required"
          label="Required"
          type="text" 
            value={street} 
            onChange={(e) => setStreet(e.target.value)} 
        
        />
        </div>
        
        <div className={style.form_group}>
          <label>Civico:</label>
          <TextField
           className={style.textField}
          required
          id="outlined-required"
          label="Required"
          type="text" 
            value={civic} 
            onChange={(e) => handleCivic(e.target.value)} 
           
        />
       {invalidCivic!="" && <span className={style.invalidLabel}>{invalidCivic}</span>}
        
        </div>
            </div>


        </div>


        <div  className={style.loginButton}>

             <Button type="submit" variant="contained">Registrati</Button>
        </div>
      </form>
       </div>
        </>
    )
}

export default Registration