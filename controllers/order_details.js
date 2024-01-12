import { connection } from '../database.js';


export const getOrdersDetails = async (req, res) => {
    const results = await connection.promise().query(`SELECT * FROM OrderDetails`);

    res.send(results[0]);
}

export const getOrderDetails = async (req, res) => {
    const { id } = req.params;

    const results = await connection.promise().query(
        `SELECT * FROM OrderDetails WHERE OrderDetailID = ${id};`
    );

    res.send(results[0]);
}

export const updateOrderDetails = async (req, res) => {
    const { id } = req.params;
    let { productId, quantity } = req.body;

    const results = await connection.promise().query(
        `SELECT * FROM OrderDetails WHERE OrderID = ${id};`
    );

    if (productId === undefined) productId = results[0][0].ProductID;
    if (quantity === undefined) quantity = results[0][0].Quantity;

    const sqlQuery = `
                        UPDATE OrderDetails SET  
                                ProductID = ${productId},
                                Quantity = ${quantity}
                        WHERE OrderDetailID = ${id};
                    `
    try {
        await connection.promise().query(sqlQuery);
        res.send(`Order details with the id ${id} has been updated`);
    } catch (error) {
        res.send(error);
    } 
}
