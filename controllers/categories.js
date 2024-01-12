import { connection } from '../database.js';


export const getCategories = async (req, res) => {
    const results = await connection.promise().query(`SELECT * FROM Categories`);

    res.send(results[0]);
}

export const createCategory = (req, res) => {

    const { categoryName, description } = req.body;
    
    if ( categoryName && description ) {
        connection.promise().query(
            `INSERT INTO Categories (CategoryName, Description)
            VALUES ('${categoryName}', '${description}');`
        );

        res.send(`Category with the name ${categoryName} was added to the database!`);
    } else {
        res.send(`Please input Category details. As example: 
                    {
                        "categoryName": "Category Name",
                        "description": "Description"
                    }`
        );
    }
}

export const getCategory = async (req, res) => {
    const { id } = req.params;

    const results = await connection.promise().query(
        `SELECT * FROM Categories WHERE CategoryID = ${id};`
    );

    res.send(results[0]);
}

export const removeCategory = (req, res) => {
    const {id} = req.params;

    connection.promise().query(
        `DELETE FROM Categories WHERE CategoryID = ${id};`
    );

    res.send(`Category with the id ${id} deleted from the database`);
}

export const updateCategory = async (req, res) => {
    const { id } = req.params;
    let { categoryName,  description } = req.body;

    const results = await connection.promise().query(
        `SELECT * FROM Categories WHERE CategoryID = ${id};`
    );

    if (categoryName === undefined) categoryName = results[0][0].CategoryName;
    if (description === undefined) description = results[0][0].Description;

    connection.promise().query(
        `
            UPDATE Categories
                SET 
                    LastName = '${categoryName}', 
                    FirstName = '${description}'
            WHERE CategoryID = ${id};
        `
    );

    res.send(`Category with the id ${id} has been updated`);
}
