import { connection } from '../database.js';


export const getShippers = async (req, res) => {
    const results = await connection.promise().query(`SELECT * FROM Shippers`);

    res.send(results[0]);
}

export const createShipper = async (req, res) => {

    const { shipperName, shipperPhone } = req.body;

    if ( shipperName && shipperPhone ) {

        const shippersSqlQuery = `
                            INSERT INTO Shippers (ShipperName, Phone)
                            VALUES ('${shipperName}', '${shipperPhone}');
                        `;
        
        try {
            const result = await connection.promise().query(shippersSqlQuery);

            res.send(`Shipper with ID ${result[0].insertId} was added to the database!`);
        } catch (error) {
            res.send(error);
        } 
    } else {
        res.send(`
                    Please input shipper details. As example: 
                        {
                            "shipperName": "Shipper Name",
                            "shipperPhone": "(503) 555-9931",
                        }
                `
        );
    }
}

export const getShipper = async (req, res) => {
    const { id } = req.params;

    const results = await connection.promise().query(
        `SELECT * FROM Shippers WHERE ShipperID = ${id};`
    );

    res.send(results[0]);
}

export const removeShipper = (req, res) => {
    const {id} = req.params;

    connection.promise().query(
        `DELETE FROM Shippers WHERE ShipperID = ${id};`
    );

    res.send(`Shipper with the id ${id} deleted from the database`);
}

export const updateShipper = async (req, res) => {
    const { id } = req.params;
    let { shipperName, shipperPhone } = req.body;

    const results = await connection.promise().query(
        `SELECT * FROM Shippers WHERE ShipperID = ${id};`
    );

    if (shipperName === undefined) shipperName = results[0][0].ShipperName;
    if (shipperPhone === undefined) shipperPhone = results[0][0].ShipperPhone;

    const sqlQuery = `
                        UPDATE Shippers SET 
                            ShipperName = '${shipperName}', 
                            Phone = '${shipperPhone}'
                        WHERE ShipperID = ${id};
                    `
    try {
        await connection.promise().query(sqlQuery);
        res.send(`Shipper with the id ${id} has been updated`);
    } catch (error) {
        res.send(error);
    } 
}
