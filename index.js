import express from 'express';
import bodyParser from 'body-parser';

import customersRoutes from './routes/customers.js';
import employeesRoutes from './routes/employees.js';
import categoriesRoutes from './routes/categories.js';
import ordersRoutes from './routes/orders.js';
import ordersDetailsRoutes from './routes/order_details.js';
import productsRoutes from './routes/products.js';

const app = express();
const PORT = 5050;

app.use(bodyParser.json());

app.use('/customers', customersRoutes);

app.use('/employees', employeesRoutes);

app.use('/categories', categoriesRoutes);

app.use('/orders', ordersRoutes);

app.use('/orders_details', ordersDetailsRoutes);

app.use('/products', productsRoutes);

app.get('/', (req, res) => {res.send('Hello from Homepage')});

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));