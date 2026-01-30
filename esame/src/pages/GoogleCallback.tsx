import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


//PAGINA PER LA CHE ESTRAE I DATI CHE SERVONO DAL TOKEN DI LOGIN DI GOOGLE
interface DecodedToken {
  id: string;
  email: string;
}

function GoogleCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    //PRENDO IL TOKEN DALL'URL
    const token = searchParams.get('token');

    if (token) {
      try {
        //DECODIFICA TOKEN
        const userDecoded: DecodedToken = jwtDecode(token);
        console.log(userDecoded);
        //SALVATAGGIO TOKEN
        localStorage.setItem('token', token);
        navigate('/home');

      } catch (error) {
        console.error("Token non valido", error);
        navigate('/login');
      }
    } else {
      //SE IL TOKEN NON C'è TORNO AL LOGIN
      navigate('/login');
    }
  }, [searchParams, navigate]);


  return <div>Accesso in corso... attendere prego.</div>;
};

export default GoogleCallback;