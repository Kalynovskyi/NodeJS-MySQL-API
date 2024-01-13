import express from 'express';
 
import { createProduct, getProducts, getProduct, removeProduct, updateProduct } from  '../controllers/products.js';

const router = express.Router();


router.get('/', getProducts);

router.post('/', createProduct);

router.get('/:id', getProduct);

router.delete('/:id', removeProduct);

router.patch('/:id', updateProduct);

export default router;