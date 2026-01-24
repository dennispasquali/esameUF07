// src/app.ts
import express from 'express';
import cors from 'cors';
import prodottoRoutes from './routes/ProductRoutes';
import { getImageData } from './controllers/CarouselController';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Abilita richieste da frontend esterni
app.use(express.json()); // Permette di leggere i JSON nel body delle richieste

// Rotte
app.use('/api/products', prodottoRoutes);

app.get('/api/carousel',getImageData)

// Rotta di test base
app.get('/', (req, res) => {
  res.send('API Tipografia funzionanti 🚀');
});

// Avvio server
app.listen(PORT, () => {
  console.log(`Server attivo su http://localhost:${PORT}`);
});