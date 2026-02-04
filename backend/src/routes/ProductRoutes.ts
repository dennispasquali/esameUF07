// src/routes/prodottoRoutes.ts
import { Router } from 'express';
import { getProdotti, getReviewsByProdottoId, submitProductReview } from '../controllers/ProductController';
import { verifyToken } from '../middleware/authMiddleware';

const router = Router();

// GET http://localhost:3000/api/products
router.get('/:page', getProdotti);

// GET http://localhost:3000/api/products/1/reviews
router.get('/:id/reviews', getReviewsByProdottoId);

// POST http://localhost:3000/api/products/1/reviews/submit
router.post('/:id/reviews/submit',verifyToken, submitProductReview);

export default router;