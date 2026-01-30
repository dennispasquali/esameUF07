import { Router } from 'express';
import {AuthRequest, verifyToken } from '../middleware/authMiddleware';
import { login } from '../controllers/LoginController';
import prisma from '../prisma';
import { addToCart, deleteProductCart, getCart } from '../controllers/CartController';

const router = Router();


// POST http://localhost:3000/api/cart/submit
router.post('/submit',verifyToken, addToCart);

// GET http://localhost:3000/api/cart/:id
router.get('/:id',verifyToken,getCart);

// DELETE http://localhost:3000/api/cart/delete/item/:idOrder
router.delete('/delete/item/:idOrder',verifyToken,deleteProductCart);

export default router;