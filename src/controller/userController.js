const userModel = require("../model/userModel")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

// ...........................Function for Validaion..................................

const isValid = function (value) {
    if (typeof value == undefined || value == null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}

// .........................................................................................


const createUser = async function (req, res) {
    try {
        // const adminId=req.params.adminId
        if (data.role == 'Admin') {
            const data = req.body
            data.password = bcrypt.hashSync(data.password, 10); // creating encrypted password
            const userData = await userModel.create(data)

            return res.status(201).send({ status: true, data: userData })
        } else {
            return res.status(400).send({ status: false, message: 'You have no privilage to perform this action ' });
        }
    } catch (error) {
        return res.status(500).send({ Status: false, ERROR: error.message })
    }
}
//..............................................................................................................

const userLogin = async function (req, res) {
    try {
        let data = req.body
        let query = req.query

        if (isValidRequestBody(query)) {
            return res.status(400).send({ status: false, error: 'this is not allowed' })
        }

        if (!data) {
            return res.status(400).send({ status: false, ERROR: "please input Data" })
        }

        if (!isValid(data.email)) {
            return res.status(401).send({ status: false, ERROR: "please input valid emailId" })
        }

        if (!isValid(data.password)) {
            return res.status(401).send({ status: false, ERROR: "please input valid password" })
        }


        const user = await userModel.findOne({ email: data.email })
        if (!user) {
            return res.status(404).send({ status: false, ERROR: "User not  found" })
        }

        const userID = user._id
        const payLoad = { userId: userID }
        const secretKey = "nodejsAssignment"

        // creating JWT

        const token = jwt.sign(payLoad, secretKey, { expiresIn: "1hr" })

        res.header("encore", token)  //setting token into header

        res.status(200).send({ status: true, message: "login successful", data: token })

    } catch (err) {
        return res.status(500).send({ status: false, ERROR: err.message })
    }
}


//...................................................................................................................

const getUserProfile = async (req, res) => {
    try {
        const data = req.body
        const { role } = data
        if (data.role == 'Admin' || data.role == 'User') {  //checking for the accesibility

            const userRes = await userModel.find();
            return res.status(200).send({ status: true, message: 'User profile details', data: userRes });
        } else {
            return res.status(400).send({ status: false, message: 'You have no privilage to perform this action ' });

        }
    } catch (err) {
        return res.status(500).send({
            status: false, error: err.message
        });
    }
}
module.exports.createUser = createUser
module.exports.userLogin = userLogin
module.exports.getUserProfile = getUserProfile