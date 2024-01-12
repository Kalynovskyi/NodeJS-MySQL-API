import { connection } from '../database.js';


export const getCustomers = async (req, res) => {
    const results = await connection.promise().query(`SELECT * FROM Customers`);

    res.send(results[0]);
}

export const createCustomer = (req, res) => {

    const { customerName, contactName, address, city, postalCode, country} = req.body;
    
    if ( customerName && contactName && address && city && postalCode && country ) {
        connection.promise().query(
            `INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country)
            VALUES ('${customerName}', '${contactName}', '${address}','${city}','${postalCode}','${country}')`
        );

        res.send(`Customer with the name ${customerName} was added to the database!`);
    } else {
        res.send(`Please input customer details. As example: 
                    {
                        "customerName": "Customer Name",
                        "contactName": "Contact Contact",
                        "address": "Address",
                        "city": "City",
                        "postalCode": "Postal Code",
                        "country": "Country"
                    }`
        );
    }
}

export const getCustomer = async (req, res) => {
    const { id } = req.params;

    const results = await connection.promise().query(
        `SELECT * FROM Customers WHERE CustomerID = ${id};`
    );

    res.send(results[0]);
}

export const removeCustomer = (req, res) => {
    const {id} = req.params;

    connection.promise().query(
        `DELETE FROM Customers WHERE CustomerID = ${id};`
    );

    res.send(`Customer with the id ${id} deleted from the database`);
}

export const updateCustomer = async (req, res) => {
    const { id } = req.params;
    let { customerName, contactName, address, city, postalCode, country} = req.body;

    const results = await connection.promise().query(
        `SELECT * FROM Customers WHERE CustomerID = ${id};`
    );

    if (customerName === undefined) customerName = results[0][0].CustomerName;
    if (contactName === undefined) contactName = results[0][0].ContactName;
    if (address === undefined)  address = results[0][0].Address;
    if (city === undefined) city = results[0][0].City;
    if (postalCode === undefined) postalCode = results[0][0].PostalCode;
    if (country === undefined)  country = results[0][0].Country;

    connection.promise().query(
        `
            UPDATE Customers
                SET 
                    CustomerName = '${customerName}', 
                    ContactName = '${contactName}', 
                    Address = '${address}', 
                    City = '${city}', 
                    PostalCode = '${postalCode}', 
                    Country = '${country}'
            WHERE CustomerID = ${id};
        `
    );

    res.send(`Customer with the id ${id} has been updated`);
}