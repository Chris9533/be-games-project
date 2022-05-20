const { fetchUsers, fetchUser } = require("../Models/users.models")


exports.returnUsers = (req, res, next) => {
    
    fetchUsers().then((users) => {
       
        res.status(200).send({ users })

    })
    .catch((err) => {
        next(err);
    })
}

exports.returnUser = (req, res, next) => {
    const { username } = req.params

    fetchUser(username).then((user) => {
        res.status(200).send({ user })
    })
    .catch((err) => {
        next(err);

    })
}