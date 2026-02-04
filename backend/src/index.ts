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
import LoginRoutes from './routes/LoginRoutes';
import OrdersRoutes from './routes/OrdersRoutes';
import CartRoutes from './routes/CartRoutes';
import { getEmployees } from './controllers/EmployeesController';
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Abilita richieste da frontend esterni
app.use(express.json()); // Permette di leggere i JSON nel body delle richieste
app.use(passport.initialize());
// Rotte
app.use('/api/products', prodottoRoutes);
app.use('/api/login',LoginRoutes);
app.use('/auth', OauthRoutes);
app.use('/api/orders',OrdersRoutes);

app.get('/api/employee',getEmployees);
app.get('/api/carousel',getImageData)

app.use('/api/cart',CartRoutes);

app.post('/api/registration/submit',registerNewUser);

// Avvio server
app.listen(PORT, () => {
  console.log(`Server attivo su http://localhost:${PORT}`);
});