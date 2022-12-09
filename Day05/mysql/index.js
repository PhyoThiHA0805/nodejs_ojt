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
    const addColumn = "ALTER TABLE customers ADD COLUMN phone VARCHAR(255)";
    con.query(addColumn, (err) => {
      if (err) throw err;
      console.log("Column added successfully");
    });

    // Add one value to Table
    const addValue =
      "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
    con.query(addValue, (err, result) => {
      if (err) throw err;
      console.log("1 record inserted ", "ID :", result.insertId);
    });

    // Add Multiple values to Table
    const addMultiValues = "INSERT INTO customers (name, address) VALUES ?";
    const values = [
      ["John", "Highway 71"],
      ["Peter", "Lowstreet 4"],
      ["Amy", "Apple st 652"],
      ["Hannah", "Mountain 21"],
      ["Michael", "Valley 345"],
      ["Sandy", "Ocean blvd 2"],
      ["Betty", "Green Grass 1"],
      ["Richard", "Sky st 331"],
      ["Susan", "One way 98"],
      ["Vicky", "Yellow Garden 2"],
      ["Ben", "Park Lane 38"],
      ["William", "Central st 954"],
      ["Chuck", "Main Road 989"],
      ["Viola", "Sideway 1633"],
    ];

    con.query(addMultiValues, [values], (err, result) => {
      console.log("Number of records inserted: " + result.affectedRows);
    });
  });
});
