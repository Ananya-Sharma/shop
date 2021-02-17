const mysql = require('mysql2');

const pool = mysql.createPool({
     host: 'localhost',
     user : 'root',
     database : 'shop-node',
     password : 'Anshar376o$'
});

module.exports = pool.promise();