import mysql from 'mysql2';

export const connection = mysql.createConnection({
  host: 'Nikitas-MacBook-Pro.local',
  user: 'root',
  password: 'password',
  database: 'Northwind'
});

connection.connect();