
const mysql = require('mysql');

var connection;

    if (process.env.JAWDB_URL) {
        connection = mysql.createConnection(process.env.JAWDB_URL)
    } else {
        connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'password',  // your password
            database: 'bamazon',
            port: 3306 
        })
    }


module.exports = connection