const express = require('express');
const router = express.Router();


const userController = require('../controller/userController');
const middleware= require('../middleware/auth')

router.post('/userLogin',userController.userLogin) 
//user login

router.post('/createUser',middleware.authenticate,middleware.authorisation,userController.createUser)
//create user

router.get('/getUser',middleware.authenticate,middleware.authorisation,userController.getUserProfile)
//get users



module.exports = router;
