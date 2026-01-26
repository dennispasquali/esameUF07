import { useMutation } from "@tanstack/react-query";
import type { ApiError } from "../Interfaces/ApiError";


async function postCall<Tin,Tout>(url:string, content:Tin) :Promise<Tout>{
    try {
         const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify(content),
  });

  if (!response.ok) {
    const textBody = await response.text();
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

    return await response.json() as Tout;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err:any) {
        if (err.status !== undefined && err.details !== undefined) {
      throw err;
    }

    const networkError: ApiError = {
      status: null, // Non c'è status code
      message: "Network Error", 
      details: err.message || "Impossibile contattare il server. Controlla la connessione."
    };
    
    throw networkError;
    }
}
 

export function useApiPost<Tin,Tout>(url:string) {

  return useMutation<Tout,ApiError,Tin>({
    mutationFn: (content) => postCall<Tin,Tout>(url, content), // Passi solo la funzione, React Query fa il resto
});
}

