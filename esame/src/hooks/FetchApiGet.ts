import { useEffect, useState } from "react";

export function FetchApiGet<T>(url:string) {
    const [data,setData]=useState<T | null>(null);
    const [loading,setLoading]=useState<boolean>(true);
    const [error,setError]=useState<string | null>(null);

    useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Errore nella chiamata: ${response.statusText}`);
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Si è verificato un errore sconosciuto');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, [url]);

  return { data, loading, error };
}