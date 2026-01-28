// src/routes/prodottoRoutes.ts
import { Router } from 'express';
import { getProdotti, getReviewsByProdottoId, submitProductReview } from '../controllers/ProductController';

const router = Router();

// GET http://localhost:3000/api/products
router.get('/', getProdotti);

// GET http://localhost:3000/api/products/1/reviews
router.get('/:id/reviews', getReviewsByProdottoId);

// POST http://localhost:3000/api/products/1/reviews/submit
router.post('/:id/reviews/submit', submitProductReview);

export default router;