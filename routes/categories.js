import express from 'express';
 
import { createCategory, getCategories, getCategory, removeCategory, updateCategory } from  '../controllers/categories.js';

const router = express.Router();


router.get('/', getCategories);

router.post('/', createCategory);

router.get('/:id', getCategory);

router.delete('/:id', removeCategory);

router.patch('/:id', updateCategory);

export default router;