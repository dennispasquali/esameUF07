import { useEffect, useState } from "react";
import type { ApiError } from "../Interfaces/ApiError";

//HOOK CHE SI OCCUPA DI FARE LE GET
export function useFetchApiGet<T>(url: string, token?: string | null) {
  //USE STATE CHE CONTENGONO DATI RESTITUITI EVENTUALI ERRORI E SE LA CHIAMATA è IN PENDING
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApiError | null>(null);

  //ONGI VOLTA CHE URL O TOKEN CAMBIANO NEI VARI COMPONENTI VIENE FATTA RIPARTIRE LA CHIAMATA API
  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchData = async () => {
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

        if (!response.ok) {
          //Recuperiamo il body come testo
          const textBody = await response.text();

          //Proviamo a vedere se è JSON per pulirlo, altrimenti teniamo il testo
          let cleanDetails = textBody;
          try {
            const jsonBody = JSON.parse(textBody);
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

        const jsonData = await response.json();
        setData(jsonData);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError({
          status: err.status || null,
          message: err.message || "Errore di connessione",
          details: err.details || "Impossibile contattare il server",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, token]);

  return { data, loading, error };
}
