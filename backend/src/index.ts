import express, { type Request, type Response } from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// 1. DEFINIAMO IL TIPO (Lo stesso che userai nel Frontend!)
interface Order {
  id: number;
  title: string;
  price: number;
  status: 'pending' | 'shipped'; // Stringhe specifiche!
}

// Dati finti tipizzati
const orders: Order[] = [
  { id: 1, title: "Biglietti", price: 45, status: 'pending' },
  { id: 2, title: "Rollup", price: 80, status: 'shipped' }
];

// --- LE API ---

// GET con i tipi
app.get('/api/orders', (req: Request, res: Response) => {
  res.json(orders);
});

// POST
app.post('/api/orders', (req: Request, res: Response) => {
  // TypeScript qui non sa cosa c'è in req.body, quindi facciamo un cast o validazione
  const newOrder: Order = {
    id: Date.now(),
    title: req.body.title,
    price: req.body.price,
    status: 'pending'
  };
  
  orders.push(newOrder);
  res.json(newOrder);
});

app.listen(3001, () => {
  console.log('Server TS attivo su http://localhost:3001');
});