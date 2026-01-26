import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Importiamo la libreria


// Definiamo cosa c'è dentro il tuo Token (deve coincidere col backend)
interface DecodedToken {
  id: string;
  email: string;
}

function GoogleCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Prendiamo il token dall'URL (?token=...)
    const token = searchParams.get('token');

    if (token) {
      try {
        // 2. Decodifichiamo il token per avere i dati utente
        const userDecoded: DecodedToken = jwtDecode(token);
        console.log(userDecoded);
        // 3. Salviamo nel localStorage (Persistenza)
        localStorage.setItem('token', token);
        navigate('/home');

      } catch (error) {
        console.error("Token non valido", error);
        navigate('/login');
      }
    } else {
      // Se non c'è il token, torniamo al login
      navigate('/login');
    }
  }, [searchParams, navigate]);


  return <div>Accesso in corso... attendere prego.</div>;
};

export default GoogleCallback;