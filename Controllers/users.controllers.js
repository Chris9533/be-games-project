const { fetchUsers } = require("../Models/users.models")


exports.returnUsers = (req, res) => {
    
    fetchUsers().then((users) => {
       
        res.status(200).send({ users })

    })
    .catch((err) => {
        next(err);
    })
}