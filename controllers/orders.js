import { connection } from '../database.js';


export const getOrders = async (req, res) => {
    const results = await connection.promise().query(`SELECT * FROM Orders`);

    res.send(results[0]);
}

export const createOrder = async (req, res) => {

    const { customerId, employeeId, shipperId, productId, quantity } = req.body;

    if ( customerId && employeeId && shipperId && productId && quantity) {

        const ordersSqlQuery = `
                            INSERT INTO Orders (CustomerID, EmployeeID, OrderDate, ShipperID)
                            VALUES (${customerId}, ${employeeId}, NOW(), ${shipperId});
                        `;
        const orderDetailsSqlQuery = `
                        INSERT INTO OrderDetails (OrderID, ProductID, Quantity)
                        VALUES (LAST_INSERT_ID(), ${productId}, ${quantity});
                    `;
        
        try {
            const result = await connection.promise().query(ordersSqlQuery);
            await connection.promise().query(orderDetailsSqlQuery);

            res.send(`Order with ID ${result[0].insertId} was added to the database!`);
        } catch (error) {
            res.send(error);
        } 
    } else {
        res.send(`
                    Please input Order details. As example: 
                        {
                            "customerId": "1",
                            "employeeId": "1",
                            "shipperId": "1",
                            "productId": "1",
                            "quantity": "1"
                        }
                `
        );
    }
}

export const getOrder = async (req, res) => {
    const { id } = req.params;

    const results = await connection.promise().query(
        `SELECT * FROM Orders WHERE OrderID = ${id};`
    );

    res.send(results[0]);
}

export const removeOrder = (req, res) => {
    const {id} = req.params;

    connection.promise().query(
        `DELETE FROM OrderDetails WHERE OrderID = ${id};`
    );
    connection.promise().query(
        `DELETE FROM Orders WHERE OrderID = ${id};`
    );

    res.send(`Order with the id ${id} deleted from the database`);
}

export const updateOrder = async (req, res) => {
    const { id } = req.params;
    let { customerId, employeeId, shipperId } = req.body;

    const results = await connection.promise().query(
        `SELECT * FROM Orders WHERE OrderID = ${id};`
    );

    if (customerId === undefined) customerId = results[0][0].CustomerId;
    if (employeeId === undefined) employeeId = results[0][0].EmployeeId;
    if (shipperId === undefined) shipperId = results[0][0].ShipperId;

    const sqlQuery = `
                        UPDATE Orders SET 
                                CustomerID = '${customerId}', 
                                EmployeeID = '${employeeId}',
                                ShipperID = '${shipperId}'
                        WHERE OrderID = ${id};
                    `
    try {
        await connection.promise().query(sqlQuery);
        res.send(`Order with the id ${id} has been updated`);
    } catch (error) {
        res.send(error);
    } 
}
