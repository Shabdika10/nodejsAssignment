const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const isValidObjectId = (ObjectId) => {
    return mongoose.Types.ObjectId.isValid(ObjectId)

}

const authenticate = function (req, res, next) {
    try {

        let decodedToken = jwt.verify(token, "encore");
        if (!decodedToken) return res.status(400).send({ status: false, msg: "invalid token" })
        req.decodedToken = decodedToken// dont't want to kill request means still want to use decoded token
        next()
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}

const authorisation = function (req, res, next) {
    try {
        const userId = req.params.userId;

        if (!isValidObjectId(userId.trim())) {
            return res.status(400).send({ status: false, message: 'Invalid ID !' });
        }

        let decodedToken = req.decodedToken
        let userloggedin = decodedToken.userId
        if (userId != userloggedin) {
            return res.status(400).send({ status: false, msg: "User is UnAuthorised" })
        }
        next()
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}


module.exports.authenticate = authenticate
module.exports.authorisation = authorisation