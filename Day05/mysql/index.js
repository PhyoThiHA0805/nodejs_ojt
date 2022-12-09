const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "PhyoThiHA445442252#mysql"
});

// Create database
con.connect((err) => {
    if (err)
        throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE mytestdb", function (err, result) {
        if (err)
            throw err;
        console.log("Database created");
    });
});