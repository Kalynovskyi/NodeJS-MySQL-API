import { connection } from '../database.js';


export const getProducts = async (req, res) => {
    const results = await connection.promise().query(`SELECT * FROM Products`);

    res.send(results[0]);
}

export const createProduct = async (req, res) => {

    const { productName, supplierId, categoryId, unit, price } = req.body;

    if ( productName && supplierId && categoryId && unit && price) {

        const productSqlQuery = `
                            INSERT INTO Products (ProductName, SupplierID, CategoryID, Unit, Price)
                            VALUES ('${productName}', ${supplierId}, ${categoryId}, '${unit}', ${price});
                        `;
        
        try {
            const result = await connection.promise().query(productSqlQuery);

            res.send(`Product with ID ${result[0].insertId} was added to the database!`);
        } catch (error) {
            res.send(error);
        } 
    } else {
        res.send(`
                    Please input Product details. As example: 
                        {
                            "productName": "Product Name",
                            "supplierId": "1",
                            "categoryId": "1",
                            "unit": "Product Description",
                            "price": "9.99"
                        }
                `
        );
    }
}

export const getProduct = async (req, res) => {
    const { id } = req.params;

    const results = await connection.promise().query(
        `SELECT * FROM Products WHERE ProductID = ${id};`
    );

    res.send(results[0]);
}

export const removeProduct = (req, res) => {
    const {id} = req.params;

    connection.promise().query(
        `DELETE FROM Products WHERE ProductID = ${id};`
    );

    res.send(`Product with the id ${id} deleted from the database`);
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    let { productName, supplierId, categoryId, unit, price } = req.body;

    const results = await connection.promise().query(
        `SELECT * FROM Products WHERE ProductID = ${id};`
    );

    if (productName === undefined) productName = results[0][0].ProductName;
    if (supplierId === undefined) supplierId = results[0][0].supplierID;
    if (categoryId === undefined) categoryId = results[0][0].CategoryID;
    if (unit === undefined) unit = results[0][0].Unit;
    if (price === undefined) price = results[0][0].Price;

    const sqlQuery = `
                        UPDATE Products SET 
                            ProductName = '${productName}', 
                            supplierID = '${supplierId}',
                            CategoryID = '${categoryId}',
                            Unit = '${unit}',
                            Price = '${price}'
                        WHERE ProductID = ${id};
                    `
    try {
        await connection.promise().query(sqlQuery);
        res.send(`Product with the id ${id} has been updated`);
    } catch (error) {
        res.send(error);
    } 
}
