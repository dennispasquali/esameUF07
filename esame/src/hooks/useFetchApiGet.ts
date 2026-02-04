import type { ApiError } from "../Interfaces/ApiError";
import {useQuery, type UseQueryOptions } from "@tanstack/react-query";


//HOOK PER LE CHIAMATE GET CHE SFRUTTA LA LIBRERIA REACT QUERY

/**
 * FUNZIONE ASINCRONA CHE SI OCCUPA DI FARE LA GET
 * * @param url string- ENDPOINT API
 * * @param token? string | null EVENTUALE TOKEN MANDATO PER VERIFICARE L'UTENTE CHE FA LA RICHIESTA
 * @returns Promise<Tout> RESTITUISCE UNA PROMISE CHE AVRA UNA CERTA INTERFACCIA SPECIFICATA DA NOI
 */
async function getCall<Tout>(
  url: string,
  token?: string | null,
): Promise<Tout> {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    //SE LA RESPONSE NON è OK VIENE LANCIATO UN ERRORE DI TIPO APIERROR
    if (!response.ok) {
      const textBody = await response.text();
      let cleanDetails = textBody;
      try {
        const jsonBody = JSON.parse(textBody);
        // Se il server manda { "message": "...", "code": "..." }, prendiamo il messaggio o tutto l'oggetto stringifcato
        cleanDetails =
          jsonBody.message || jsonBody.error || JSON.stringify(jsonBody);
      } catch {
        // Non era JSON teniamo textBody così com'è
      }

      throw {
        status: response.status,
        message: response.statusText,
        details: cleanDetails,
      } as ApiError;
    }

    return (await response.json()) as Tout;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err.status !== undefined && err.details !== undefined) {
      throw err;
    }

    const networkError: ApiError = {
      status: null,
      message: "Network Error",
      details:
        err.message ||
        "Impossibile contattare il server. Controlla la connessione.",
    };

    throw networkError;
  }
}

/**
 * FUNZIONE CHE RITORNA IL RISULTATO DELLA PROMISE DELLA FUNZIONE ASINCRONA CHE SI OCCUPA DI FARE LA GET
 * * @param queryKey: string[] parametro con cui specifico l'id in cache dei miei dati 
 * * @param url string- ENDPOINT API
 * * @param token? string | null EVENTUALE TOKEN MANDATO PER VERIFICARE L'UTENTE CHE FA LA RICHIESTA
 * * @param options? opzioni di comportamento nelle chiamate api
 * @returns data:Tin isPending:boolean error:APIERROR RESTITUISCE I DATI SE LA PROMISE VA A BUON FINE O ERROR SE NON VA A BUON FINE SE è IN PENDING ISPENDING SARA SU TRUE
 */
export const useFetchApiGet = <Tout>(
  queryKey: string[], // Chiave univoca per la cache (es. ['products', '1'])
  url: string,
  token?:string | null,       
  options?: Omit<UseQueryOptions<Tout, ApiError>, 'queryKey' | 'queryFn'> // Opzioni extra opzionali
) => {
  return useQuery<Tout, ApiError>({
    queryKey,
    queryFn: () => getCall<Tout>(url,token),
    ...options, // Passa opzioni come 'enabled', 'refetchOnWindowFocus', ecc.
  });
};

