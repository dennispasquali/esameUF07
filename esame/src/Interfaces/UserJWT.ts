// Questa interfaccia rappresenta l'utente "pulito" (senza password)
export interface UserProfile {
    id: number; 
    name: string;
    surname: string;
    email: string;
    googleId?: string | null; // Opzionale, presente solo se loggato con Google
    imgProfile?: string | null;
}

export interface IUserJWT {
    message: string;      // Es. "Login effettuato con successo"
    token: string;        // Il JWT (es. "eyJhbGciOi...")
    user: UserProfile;    // L'oggetto utente coi dati sopra
}