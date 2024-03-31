const mysql = require('mysql2');

// Cria uma conexão MySQL
const connection = mysql.createConnection({
    host: 'monorail.proxy.rlwy.net',
    port: 36566,
    user: 'root',
    password: 'mGThpWQjjlwdaaNwxpDsZOzzkjjjkfCN',
    database: 'railway'
});

// Conecta ao MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database as id ' + connection.threadId);
});

module.exports = connection;