// src/app.ts
import express from 'express';
import cors from 'cors';
import prodottoRoutes from './routes/ProductRoutes';
import { getImageData } from './controllers/CarouselController';
import { registerNewUser } from './controllers/RegistrationController';
import { login } from './controllers/LoginController';
import passport from 'passport';
import OauthRoutes from './routes/OauthRoutes';
import './config/passport';
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Abilita richieste da frontend esterni
app.use(express.json()); // Permette di leggere i JSON nel body delle richieste
app.use(passport.initialize());
// Rotte
app.use('/api/products', prodottoRoutes);

app.get('/api/carousel',getImageData)

app.use('/auth', OauthRoutes);


app.post('/api/registration/submit',registerNewUser);

app.post('/api/login/submit',login);
// Avvio server
app.listen(PORT, () => {
  console.log(`Server attivo su http://localhost:${PORT}`);
});