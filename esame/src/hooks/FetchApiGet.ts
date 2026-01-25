import { useEffect, useState } from "react";
import type { ApiError } from "../Interfaces/ApiError";

export function FetchApiGet<T>(url:string) {
    const [data,setData]=useState<T | null>(null);
    const [loading,setLoading]=useState<boolean>(true);
    const [error,setError]=useState<ApiError | null>(null);

    useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        
        if (!response.ok) {
         // 1. Recuperiamo il body (qualsiasi cosa sia) come testo
          const textBody = await response.text();
          
          // 2. Proviamo a vedere se è JSON per pulirlo, altrimenti teniamo il testo grezzo
          let cleanDetails = textBody;
          try {
             const jsonBody = JSON.parse(textBody);
             // Se il server manda { "message": "...", "code": "..." }, prendiamo il messaggio o tutto l'oggetto stringifcato
             cleanDetails = jsonBody.message || jsonBody.error || JSON.stringify(jsonBody);
          } catch {
             // Non era JSON (magari HTML di errore), teniamo textBody così com'è
          }

          throw {
            status: response.status,
            message: response.statusText,
            details: cleanDetails
          } as ApiError;
        }

        const jsonData = await response.json();
        setData(jsonData);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err:any) {
       setError({
          status: err.status || null,
          message: err.message || "Errore di connessione",
          details: err.details || "Impossibile contattare il server"
        });
        
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, [url]);

  return { data, loading, error };
}