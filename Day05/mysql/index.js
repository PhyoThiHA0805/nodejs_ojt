const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "PhyoThiHA445442252#mysql",
});

// Create database
con.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
  // con.query("CREATE DATABASE mytestdb", function (err, result) {
  //     if (err)
  //         throw err;
  //     console.log("Database created");
  // });

  // Create Table
  con.query("USE mytestdb", (err) => {
    if (err) throw err;

    const sql =
      "CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))";
    con.query(sql, (err) => {
      if (err) throw err;
      console.log("Table created successfully");
    });

    // Add Column to existing Table
      const addColumn = "ALTER TABLE customers ADD COLUMN phone VARCHAR(255)"
      con.query(addColumn, (err) => {
          if (err) throw err;
          console.log("Column added successfully");
      })
  });
});
