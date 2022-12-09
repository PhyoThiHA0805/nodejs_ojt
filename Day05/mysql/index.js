const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "PhyoThiHA445442252#mysql"
});

con.connect((err) => {
    if (err) return console.log(err);
    console.log("Database connected....")
})