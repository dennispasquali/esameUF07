import { Router } from 'express';
import {AuthRequest, verifyToken } from '../middleware/authMiddleware';
import { login } from '../controllers/LoginController';
import prisma from '../prisma';
import { getOrdersArrived, getOrdersToArrive } from '../controllers/OrderController';

const router = Router();



// GET http://localhost:3000/api/login/verify
router.get('/toArrive', verifyToken,getOrdersToArrive);

router.get('/arrived',verifyToken,getOrdersArrived)

export default router;