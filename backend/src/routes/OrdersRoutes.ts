import { Router } from 'express';
import {AuthRequest, verifyToken } from '../middleware/authMiddleware';
import { login } from '../controllers/LoginController';
import prisma from '../prisma';
import { getOrdersArrived, getOrdersToArrive } from '../controllers/OrderController';

const router = Router();



// GET http://localhost:3000/api/orders/toArrive
router.get('/toArrive', verifyToken,getOrdersToArrive);

// GET http://localhost:3000/api/orders/arrived
router.get('/arrived',verifyToken,getOrdersArrived)

export default router;