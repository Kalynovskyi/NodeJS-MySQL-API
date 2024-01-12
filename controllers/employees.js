import { connection } from '../database.js';


export const getEmployees = async (req, res) => {
    const results = await connection.promise().query(`SELECT * FROM Employees`);

    res.send(results[0]);
}

export const createEmployee = async (req, res) => {

    const { lastName, firstName, birthDate, photo, notes } = req.body;
    
    if ( lastName && firstName && birthDate && photo && notes ) {

        const sqlQuery = `
                            INSERT INTO Employees (LastName, FirstName, BirthDate, Photo, Notes)
                            VALUES ('${lastName}', '${firstName}', '${birthDate}','${photo}','${notes}');
                        `
        try {
            await connection.promise().query(sqlQuery);
            res.send(`Employee with the name ${lastName} was added to the database!`);
        } catch (error) {
            res.send(error);
        }

    } else {
        res.send(`Please input Employee details. As example: 
                    {
                        "lastName": "Last Name",
                        "firstName": "First Name",
                        "birthDate": 1900-01-01
                        "photo": "Photo",
                        "notes": "Notes"
                    }`
        );
    }
}

export const getEmployee = async (req, res) => {
    const { id } = req.params;

    const results = await connection.promise().query(
        `SELECT * FROM Employees WHERE EmployeeID = ${id};`
    );

    res.send(results[0]);
}

export const removeEmployee = (req, res) => {
    const {id} = req.params;

    connection.promise().query(
        `DELETE FROM Employees WHERE EmployeeID = ${id};`
    );

    res.send(`Employee with the id ${id} deleted from the database`);
}

export const updateEmployee = async (req, res) => {
    const { id } = req.params;
    let { lastName, firstName, birthDate, photo, notes } = req.body;

    const results = await connection.promise().query(
        `SELECT * FROM Employees WHERE EmployeeID = ${id};`
    );

    if (lastName === undefined) lastName = results[0][0].LastName;
    if (firstName === undefined) firstName = results[0][0].FirstName;
    if (photo === undefined) photo = results[0][0].Photo;
    if (notes === undefined) notes = results[0][0].Notes;
    if (birthDate === undefined) {
        birthDate = results[0][0].BirthDate;
        birthDate = birthDate.toISOString().slice(0, 10);
    } 

    const sqlQuery = `
                        UPDATE Employees
                        SET 
                            LastName = '${lastName}', 
                            FirstName = '${firstName}',
                            BirthDate = STR_TO_DATE(REPLACE('${birthDate}', "-", ","), '%Y, %m, %d,'),
                            Photo = '${photo}', 
                            Notes = '${notes}'
                        WHERE EmployeeID = ${id};
                    `
    try {
        await connection.promise().query(sqlQuery);
        res.send(`Employee with the id ${id} has been updated`);
    } catch (error) {
        res.send(error);
    }
}
