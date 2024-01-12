import express from 'express';
 
import { createEmployee, getEmployees, getEmployee, removeEmployee, updateEmployee } from  '../controllers/employees.js';

const router = express.Router();


router.get('/', getEmployees);

router.post('/', createEmployee);

router.get('/:id', getEmployee);

router.delete('/:id', removeEmployee);

router.patch('/:id', updateEmployee);

export default router;