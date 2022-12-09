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

    // SELECT * FROM Table
    con.query("SELECT * FROM customers", (err, result, fields) => {
      if (err) throw err;

      console.log(result);
      //console.log("Result: " + JSON.stringify(result.map(function(row) { return row; })));
      console.log(fields[1].name);
    });

    // Selecting Columns
    con.query(
      "SELECT name, address FROM customers",
      function (err, result, fields) {
        if (err) throw err;
        console.log(result);
      }
    );

    // Get Specific Value from Table
    con.query(
      "SELECT * FROM customers WHERE address = 'Park Lane 38'",
      function (err, result) {
        if (err) throw err;
        console.log(result);
      }
    );

    // WildCard Character
    con.query(
      "SELECT * FROM customers WHERE address LIKE 'S%'",
      (err, result) => {
        if (err) throw err;
        console.log(result);
      }
    );

    // Escaping Query Values
    const addr = "Mountain 21";
    const getAddr1 =
      "SELECT * FROM customers WHERE address = " + mysql.escape(addr);

    con.query(getAddr1, function (err, result) {
      if (err) throw err;

      console.log(result);
    });

    const getAddr2 = "SELECT * FROM customers WHERE address = ?";
    con.query(getAddr2, [addr], function (err, result) {
      if (err) throw err;

      console.log(result);
    });

    const name = "Amy";
    const adr = "Mountain 21";
    const getAddr3 = "SELECT * FROM customers WHERE name = ? OR address = ?";
    con.query(getAddr3, [name, adr], function (err, result) {
      if (err) throw err;
      console.log(result);
    });

    // Order By
    con.query("SELECT * FROM customers ORDER BY name", (err, result) => {
      if (err) throw err;
      console.log(result);
    });

    // Order By Descending
    con.query("SELECT * FROM customers ORDER BY name DESC", (err, result) => {
      if (err) throw err;
      console.log(result);
    });

    // DELETE Record
    // const deleteData = "DELETE FROM customers WHERE address = 'Mountain 21'";
    // con.query(deleteData, (err, result) => {
    //   if (err) throw err;
    //   console.log("Number of record deleted: ", result.affectedRows);
    // });

    // DELETE Table
    // const dropTable = "DROP TABLE customers";
    // con.query(dropTable, (err, result) => {
    //   if (err) throw err;
    //   console.log("Table Deleted");
    // });

    // DELETE Table if exit
    // const dropTable2 = "DROP TABLE IF EXISTS customers";
    // con.query(dropTable2, (err, result) => {
    //   if (err) throw err;

    //   console.log(result);
    // });

    // UPDATE Table
    const update =
      "UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'";
    con.query(update, (err, result) => {
      if (err) throw err.message;

      console.log(result.affectedRows + " record(s) updated");
    });

    // LIMIT the Result
    const limit = "SELECT * FROM customers LIMIT 5";
    con.query(limit, (err, result) => {
      if (err) throw err;

      console.log("Limitted customers list", result);
    });

    // Start From Another Position
    const limitFromAnother = "SELECT * FROM customers LIMIT 5 OFFSET 2";
    con.query(limitFromAnother, (err, result) => {
      if (err) throw err;

      console.log("Limited Customers List from Offset", result);
    });

    // JOIN Table
    const join =
      "SELECT users.name AS users, products.name AS favorite FROM users JOIN products ON users.favorite_product = products.name";
    con.query(join, (err, result) => {
      if (err) throw err;

      console.log("Joined data", result);
    });

    // Left Join
    const leftJoin =
      "SELECT users.name AS users,products.name AS favorite FROM users LEFT JOIN products ON users.favorite_product = products.name";
    con.query(leftJoin, (err, result) => {
      if (err) throw err;

      console.log("Joined data", result);
    });

    // Right Join
    const rightJoin =
      "SELECT users.name AS user, products.name AS favorite FROM users RIGHT JOIN products ON users.favorite_product = products.id";
    con.query(rightJoin, (err, result) => {
      if (err) throw err;

      console.log("Joined data", result);
    });
  });
});
