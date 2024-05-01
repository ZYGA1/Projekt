const dotenv = require('dotenv')
const mysql = require('mysql2');

dotenv.config()



const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWD,
    database: process.env.DATABASE
});

db.connect((err) => {
    if (err) console.log(err)
    else console.log("[DB] Connected")
    
});



module.exports = db.promise()