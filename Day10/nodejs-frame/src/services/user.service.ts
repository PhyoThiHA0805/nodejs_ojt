import connection from "../config/db.config";

// Get All Users
export function getUsersFromDb(req: any, res: any) {
    connection.query("SELECT * FROM users", (err, result) => {
        console.log(result);
        if (err) throw err;

        return res.status(200).send(JSON.stringify(result));
    });
}

// Create User
export function createUsertoDb(req: any, res: any) {
    console.log("Files:", req.file.filename);
    let values = [req.body.username, req.body.password];
    console.log(values);
    connection.query(
        "INSERT INTO users(username, password) VALUES (?,?)",
        values,
        (err, result) => {
            if (err) return res.send(`"Error when creating user" , ${err}`);

            return res
                .status(200)
                .render("signup", {
                    message: "User created successfully",
                    user: values,
                });
        }
    );
}

// Update User
export function updateUserFromDb(req: any, res: any) {
    let username = req.body.username;
    let password = req.body.password;
    let id = parseInt(req.params.id);

    connection.query(
        "UPDATE users SET username = ?,password =? WHERE id = ?",
        [username, password, id],
        (err, result) => {
            if (err)
                return res
                    .status(400)
                    .send(`"Error when updating data", ${err}`);

            return res
                .status(200)
                .send({ message: "User updated successfully", user: result });
        }
    );
}

// DeleterUser
export function deleteUserFromDb(req: any, res: any) {
    let id = req.params.id;
    connection.query("DELETE FROM users WHERE id = ?", id, (err, result) => {
        if (err) return res.send(`"Error when deleting data", ${err}`);

        return res.status(200).send({ message: "User deleted successfully" });
    });
}
