import express from 'express';
 
import { createOrder, getOrders, getOrder, removeOrder, updateOrder } from  '../controllers/orders.js';

const router = express.Router();


router.get('/', getOrders);

router.post('/', createOrder);

router.get('/:id', getOrder);

router.delete('/:id', removeOrder);

router.patch('/:id', updateOrder);

export default router;