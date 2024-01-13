import express from 'express';
 
import { createSupplier, getSuppliers, getSupplier, removeSupplier, updateSupplier } from  '../controllers/suppliers.js';

const router = express.Router();


router.get('/', getSuppliers);

router.post('/', createSupplier);

router.get('/:id', getSupplier);

router.delete('/:id', removeSupplier);

router.patch('/:id', updateSupplier);

export default router;