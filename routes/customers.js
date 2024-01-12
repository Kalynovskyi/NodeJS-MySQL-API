import express from 'express';
 
import { createCustomer, getCustomers, getCustomer, removeCustomer, updateCustomer } from  '../controllers/customers.js';

const router = express.Router();


router.get('/', getCustomers);

router.post('/', createCustomer);

router.get('/:id', getCustomer);

router.delete('/:id', removeCustomer);

router.patch('/:id', updateCustomer);

export default router;