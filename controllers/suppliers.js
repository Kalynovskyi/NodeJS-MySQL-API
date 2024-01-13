import { connection } from '../database.js';


export const getSuppliers = async (req, res) => {
    const results = await connection.promise().query(`SELECT * FROM Suppliers`);

    res.send(results[0]);
}

export const createSupplier = async (req, res) => {

    const { supplierName, 
            supplierContactName, 
            supplierAddress, 
            supplierCity, 
            supplierPostalCode, 
            supplierCountry, 
            supplierPhone } = req.body;

    if (    supplierName && 
            supplierContactName && 
            supplierAddress && 
            supplierCity && 
            supplierPostalCode && 
            supplierCountry && 
            supplierPhone ) {

        const SuppliersSqlQuery = `
                            INSERT INTO 
                            Suppliers (SupplierName, 
                                        ContactName, 
                                        Address, 
                                        City, 
                                        PostalCode, 
                                        Country, 
                                        Phone)
                            VALUES ('${supplierName}', 
                                    '${supplierContactName}', 
                                    '${supplierAddress}', 
                                    '${supplierCity}', 
                                    '${supplierPostalCode}', 
                                    '${supplierCountry}', 
                                    '${supplierPhone}');
                        `;
        
        try {
            const result = await connection.promise().query(SuppliersSqlQuery);

            res.send(`Supplier with ID ${result[0].insertId} was added to the database!`);
        } catch (error) {
            res.send(error);
        } 
    } else {
        res.send(`
                    Please input Supplier details. As example: 
                        {
                            "supplierName": "Name",
                            "supplierContactName": "Contact Name",
                            "supplierAddress": "Address",
                            "supplierCity": "City",
                            "supplierPostalCode": "PostalCode",
                            "supplierCountry": "Country",
                            "supplierPhone": "Phone number"
                        }
                `
        );
    }
}

export const getSupplier = async (req, res) => {
    const { id } = req.params;

    const results = await connection.promise().query(
        `SELECT * FROM Suppliers WHERE SupplierID = ${id};`
    );

    res.send(results[0]);
}

export const removeSupplier = (req, res) => {
    const {id} = req.params;

    connection.promise().query(
        `DELETE FROM Suppliers WHERE SupplierID = ${id};`
    );

    res.send(`Supplier with the id ${id} deleted from the database`);
}

export const updateSupplier = async (req, res) => {
    const { id } = req.params;
    let {   supplierName, 
            supplierContactName, 
            supplierAddress, 
            supplierCity, 
            supplierPostalCode, 
            supplierCountry, 
            supplierPhone } = req.body;

    const results = await connection.promise().query(
        `SELECT * FROM Suppliers WHERE SupplierID = ${id};`
    );

    if (supplierName === undefined) supplierName = results[0][0].SupplierName;
    if (supplierContactName === undefined) supplierContactName = results[0][0].ContactName;
    if (supplierAddress === undefined) supplierAddress = results[0][0].Address;
    if (supplierCity === undefined) supplierCity = results[0][0].City;
    if (supplierPostalCode === undefined) supplierPostalCode = results[0][0].PostalCode;
    if (supplierCountry === undefined) supplierCountry = results[0][0].Country;
    if (supplierPhone === undefined) supplierPhone = results[0][0].Phone;

    const sqlQuery = `
                        UPDATE Suppliers SET 
                            SupplierName = '${supplierName}', 
                            ContactName = '${supplierContactName}',
                            Address = '${supplierAddress}', 
                            City = '${supplierCity}',
                            PostalCode = '${supplierPostalCode}', 
                            Country = '${supplierCountry}',
                            Phone = '${supplierPhone}'
                        WHERE SupplierID = ${id};
                    `
    try {
        await connection.promise().query(sqlQuery);
        res.send(`Supplier with the id ${id} has been updated`);
    } catch (error) {
        res.send(error);
    } 
}
