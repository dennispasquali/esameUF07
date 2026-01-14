
import { useState, type ChangeEvent, type FormEvent} from "react"
import style from "../PagesStyle/Login.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import Google_logo from "../assets/google_logo.svg";
function Login() {

    const [email,setEmail]=useState<string>();
    const [invalidEmailMessage,setInvalidEmailMessage]=useState<string>("");
    const [password,setPwd]=useState<string>();

   const handleSubmit = (e:FormEvent<HTMLFormElement>) : void => {
        e.preventDefault(); // Impedisce il ricaricamento della pagina
        console.log("Dati inviati:", { email, password });
    
    
    };


    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const email:string=e.target.value;
        
        let nrAt=0;
        let nrPoint=0;
        //nr @
        let indexAt=0;
        let indexPoint=0;
        for (let i = 0; i < email.length; i++) {
            if(email.charAt(i)==='@') {
                nrAt++;
                indexAt=i;
            } else if(email.charAt(i)=='.') {
                nrPoint++;
                indexPoint=i;

            }
            
        }

        if(nrAt===1 && nrPoint===1 && indexAt>0 && indexPoint-indexAt>1 && email.length-indexPoint>1 && email.substring(indexAt+1,indexPoint).trim()!="") {
            setEmail(e.target.value);
            setInvalidEmailMessage("");
        } else {
            setEmail(e.target.value);
            setInvalidEmailMessage("email non valida");
        }
  };
    return (
       <>
       <div className={style.form}>
        <div className={style.login_header}>
        <h2>Benvenuto</h2>
        <p>Fai il login nel tuo account</p>
       </div>
       
       <form  onSubmit={handleSubmit}>
        
        <div className={style.form_group}>
          <label>Email:</label>
          <TextField
          className={style.textField}
          required
          id="outlined-required"
          label="Required"
          type="email"
          value={email}
          onChange={handleEmailChange} 
        />
          {invalidEmailMessage!="" && <span className={style.invalidEmail}>{invalidEmailMessage}</span>}
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
            onChange={(e) => setPwd(e.target.value)} 
          
        />
        <a href="#" className={style.forgot_password}>Forgot password?</a>
        </div>

        <div  className={style.loginButton}>

             <Button type="submit" variant="contained">Login</Button>
        </div>
        <div className={style.divider}>
            <span>oppure continua con</span>
        </div>

      
        <div className={style.social_login}>
            <IconButton>
                <img src={Google_logo}></img>
                <span>Google</span>
            </IconButton>
            <span className={style.noAccount}><p>Non hai ancora un Account?</p><a href="">Registrati</a></span>
        </div>
      
      
       
      </form>
       </div>
       
       </> 
    )
}

export default Login