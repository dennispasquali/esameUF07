// Questa interfaccia rappresenta l'utente "pulito" (senza password)
export interface IUserProfile {
    id: number; 
    name: string;
    surname: string;
    email: string;
    googleId?: string | null; // Opzionale, presente solo se loggato con Google
    imgProfile?: string;
}

export interface IUserJWT {
    message: string;      // Es. "Login effettuato con successo"
    token: string;        // Il JWT (es. "eyJhbGciOi...")
    user: IUserProfile;    // L'oggetto utente coi dati sopra
}