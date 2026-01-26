
import { useState} from "react"
import style from "../PagesStyle/Login.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Alert, CircularProgress, IconButton, Snackbar } from "@mui/material";
import Google_logo from "../assets/google_logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { EmailValidation } from "../hooks/EmailValidation";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useApiPost } from "../hooks/useApiPost";
import type { ILogin } from "../Interfaces/Login";
import { SnackBarCart } from "../hooks/SnackBarCart";
import type {IUserJWT} from "../Interfaces/UserJWT.ts";


function Login() {

    const { mutate, isPending } = useApiPost<ILogin,IUserJWT>('http://localhost:3000/api/login/submit');
    const [password,setPwd]=useState<string>("");
    const [genericError,setGenericError]=useState<string>("");
    const { email, invalidEmailMessage, onChange } = EmailValidation();
    const { openSnackBar, handleSnack} = SnackBarCart();
    const navigate = useNavigate();


function handleGoogleLogin() {
    window.location.href = 'http://localhost:3000/auth/google';
  };
    
function handleLogin(e:React.FormEvent) {
      e.preventDefault();
      if(password!="" && email !="") {
        const user={
          email,
          password,
        } as ILogin
        mutate(user, {
          onSuccess: (data) => {
              console.log("Registrazione effettuata", data);
              navigate('/home');
          },
          onError: (error) => {
            console.error("code: "+error?.status+" message: "+error?.message+" details: "+error?.details);
            setGenericError("Errore nel inviare i dati del form "+error?.details);
        }
          
      });
      } else {
        setGenericError("Dati non validi nel form");
      }
    }
    return (
       <>
        <div>
            <Button onClick={() => navigate("/home")} sx={{ mt: 3, fontWeight: 600, color: 'text.secondary' }}>
                <ArrowBackIcon />
        </Button>
        </div>
        
       <div className={style.form}>
        <div className={style.login_header}>
        <h2>Benvenuto</h2>
        <p>Fai il login nel tuo account</p>
       </div>
        {isPending===true? <CircularProgress className={style.loading}></CircularProgress>: <form  onSubmit={(e)=>handleLogin(e)}>
        
        <div className={style.form_group}>
          <label>Email:</label>
          <TextField
          className={style.textField}
          required
          id="outlined-required"
          label="Required"
          type="email"
          value={email}
          onChange={(e) => onChange(e.target.value)} 
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
        <a href="#" className={style.forgot_password}>Password Dimenticata?</a>
        </div>

        <div  className={style.loginButton}>

             <Button onClick={handleSnack} type="submit" variant="contained">Login</Button>
        </div>
        <div className={style.divider}>
            <span>oppure continua con</span>
        </div>

      
        <div className={style.social_login}>
            <IconButton onClick={handleGoogleLogin}>
                <img src={Google_logo}></img>
                <span>Google</span>
            </IconButton>
            <span className={style.noAccount}><p>Non hai ancora un Account?</p><Link to='/registration'>Registrati</Link></span>
        </div>
      
      
       
      </form>}
        
       </div>
       {genericError ?
             <Snackbar open={openSnackBar} autoHideDuration={3000} onClose={handleSnack}>
                <Alert  onClose={handleSnack} severity="error"> {genericError}</Alert>
               
             </Snackbar> :""}
       </> 
    )
}

export default Login