// api/productsApi.ts

import { useMutation } from "@tanstack/react-query";
import type { ApiError } from "../Interfaces/ApiError";


async function postCall<T>(url:string, content:T) :Promise<string>{
    try {
         const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Fondamentale per il backend!
    },
    body: JSON.stringify(content),
  });

  if (!response.ok) {
    // Qui riutilizziamo la logica per estrarre l'errore dal backend
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

    return await response.text() as string;
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
 

export function useApiPost<T>(url:string) {

  return useMutation<string,ApiError,T>({
    mutationFn: (content) => postCall<T>(url, content), // Passi solo la funzione, React Query fa il resto
});
}

