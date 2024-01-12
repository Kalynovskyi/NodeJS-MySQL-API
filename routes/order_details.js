import express from 'express';
 
import { getOrdersDetails, getOrderDetails, updateOrderDetails } from  '../controllers/order_details.js';

const router = express.Router();

router.get('/', getOrdersDetails);

router.get('/:id', getOrderDetails);

router.patch('/:id', updateOrderDetails);

export default router;