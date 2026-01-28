import TextField from "@mui/material/TextField";
import style from "../PagesStyle/Registration.module.css";
import Button from "@mui/material/Button";
import { useState } from "react";
import { EmailValidation } from "../hooks/EmailValidation";
import type { IRegistration } from "../Interfaces/Registration";
import { useApiPost } from '../hooks/useApiPost';
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { SnackBarCart } from "../hooks/SnackBarCart";
import { useNavigate } from "react-router-dom";
import type {IUserJWT} from "../Interfaces/UserJWT";


function Registration() {
    const [password,setPwd]=useState<string | null>(null);
    const { email, invalidEmailMessage, onChange } = EmailValidation();
    const [riconfermationPwd,setRiconfermationPwd]=useState<string>("");
    const [invalidRiconfermationMessage,setInvalidRiconfermationMessage]=useState<string>("");
    const [telephoneNumber,setTelephoneNumber]=useState<number>(0);
    const [invalidTelephoneNumber,setInvalidTelephoneNumber]=useState<string>("");
    const [prefix,setPrefix]=useState<number | null>(39);
    const [name,setName]=useState<string>("");
    const [surname,setSurname]=useState<string>("");
    const [country,setCountry]=useState<string>("");
    const [street,setStreet]=useState<string>("");
    const [civic,setCivic]=useState<number | null>(null);
    const [cap,setCap]=useState<string>("");
    const [city,setCity]=useState<string>("");
    const [invalidPrefix,setInvalidPrefix]=useState<string>("");
    const [invalidCivic,setInvalidCivic]=useState<string>("");
    const [genericError,setGenericError]=useState<string>("");
    const { openSnackBar, handleSnack} = SnackBarCart();
    
  // 1. INIZIALIZZI LA HOOK
  // Gli dici: "Punta a questa URL" e "Se va bene, aggiorna la lista 'prodotti'"
  const { mutate, isPending } = useApiPost<IRegistration,IUserJWT>('http://localhost:3000/api/registration/submit');
  const navigate = useNavigate();


   
    function handleSubmit(e:React.FormEvent) {
      e.preventDefault();
      if(password===riconfermationPwd && invalidEmailMessage==="" && telephoneNumber!==0 && prefix!==null && name!=="" && surname!=="" && country!=="" && street!=="" && civic!==null && civic && cap!=="" && city!=="") {
        setGenericError("");
        const newUser={
          name,
          surname,
          email,
          password,
          prefix,
          telephoneNumber,
          country,
          city,
          cap,
          street,
          civic,


        } as IRegistration
        mutate(newUser, {
          onSuccess: (data) => {
              setGenericError("");
              console.log("Dati ricevuti nella callback:", data);
              localStorage.setItem('token', data.token);
              localStorage.setItem('user', JSON.stringify(data.user));

              // setAuth({ token: data.token, user: data.user });
              navigate('/home');
          },
          onError: (error) => {
            console.error("code: "+error?.status+" message: "+error?.message+" details: "+error?.details);
            setGenericError("Errore nel inviare i dati del form "+error?.message);
        }
          
      });
      } else {
        setGenericError("Dati non validi nel form");
      }
    }

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

    function handleTelephoneNumber(tel:string) {
       const n=Number(tel);
        if(!Number.isNaN(n)) {
          setTelephoneNumber(n);
          setInvalidTelephoneNumber("");
        } else {
          setTelephoneNumber(0);
          setInvalidTelephoneNumber("Numero di telefono non valido");
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
       
       <form onSubmit={(e) =>handleSubmit(e)}>

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
            onChange={(e) => handleTelephoneNumber(e.target.value)} 
        
        />
         {invalidTelephoneNumber!="" && <span className={style.invalidLabel}>{invalidTelephoneNumber}</span>} 
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

             <Button onClick={handleSnack} type="submit" variant="contained">Registrati</Button>
        </div>
      </form>
       </div>

       {genericError!="" ?
      <Snackbar open={openSnackBar} autoHideDuration={3000} onClose={handleSnack}>
         <Alert  onClose={handleSnack} severity="error"> {genericError}</Alert>
        
      </Snackbar> :""}


      {isPending? <CircularProgress className={style.loading}></CircularProgress>: ""}
    
        </>
    )
}

export default Registration


