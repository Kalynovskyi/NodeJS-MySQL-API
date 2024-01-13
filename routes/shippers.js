import express from 'express';
 
import { createShipper, getShippers, getShipper, removeShipper, updateShipper } from  '../controllers/shippers.js';

const router = express.Router();


router.get('/', getShippers);

router.post('/', createShipper);

router.get('/:id', getShipper);

router.delete('/:id', removeShipper);

router.patch('/:id', updateShipper);

export default router;