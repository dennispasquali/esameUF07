export interface ApiError {
  message: string;
  status: number | null; // null se è un errore di rete (offline)
  details?: string;         // Il body della risposta server
}