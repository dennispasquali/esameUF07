/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from "react";
import type { ApiError } from "../Interfaces/ApiError";

//HOOK PER FARE DELETE SUL DB
//FUNZIONE CHE SI OCCUPA DI FARE LA DELETE
export function useFetchApiDelete<T>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Parte false perché aspettiamo il click
  const [error, setError] = useState<ApiError | null>(null);

  // Usiamo useCallback per evitare che la funzione venga ricreata ad ogni render
   /** 
   * * @param url string- ENDPOINT API
   * * @param body? any EVENTUALE BODY DELLA RICHIESTA
   * * @param token? string | null EVENTUALE TOKEN MANDATO PER VERIFICARE L'UTENTE CHE FA LA RICHIESTA
   * @returns data <T | null> loading: boolean error <ApiError | null>  RESTITUISCE error!=null SE VA MALE data!=null SE VA BENE E LOADING===true SE è IN PENDING
   */
  const executeDelete = useCallback(
    async (url: string, token?: string | null, body?: any) => {
      setLoading(true);
      setError(null);
      setData(null);

      try {
        const headers: HeadersInit = {
          "Content-Type": "application/json",
        };

        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(url, {
          method: "DELETE",
          headers: headers,
          // Aggiungiamo il body se presente (stringify solo se esiste)
          body: body ? JSON.stringify(body) : undefined,
        });

        if (!response.ok) {
          //Recuperiamo il body come testo
          const textBody = await response.text();

          //Proviamo a pulirlo
          let cleanDetails = textBody;
          try {
            const jsonBody = JSON.parse(textBody);
            cleanDetails =
              jsonBody.message || jsonBody.error || JSON.stringify(jsonBody);
          } catch {
            // Non era JSON, teniamo textBody
          }

          throw {
            status: response.status,
            message: response.statusText,
            details: cleanDetails,
          } as ApiError;
        }

        // Gestione del caso in cui la delete non restituisca contenuto (204 No Content)
        if (response.status === 204) {
          setData({} as T);
        } else {
          const jsonData = await response.json();
          setData(jsonData);
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError({
          status: err.status || null,
          message: err.message || "Errore durante l'eliminazione",
          details: err.details || "Impossibile completare l'operazione",
        });

        return { success: false };
      } finally {
        setLoading(false);
      }

      return { success: true };
    },
    [],
  );

  return { executeDelete, data, loading, error };
}
