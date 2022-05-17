const db = require("../db/connection.js");

exports.fetchUsers = () => {
   return db.query("SELECT * FROM users").then((results) => {
        console.log(results.rows)
       return results.rows

    })
    
}