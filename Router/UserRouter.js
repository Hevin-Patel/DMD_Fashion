const express = require('express')
const {registerUser, loginUser, updateUser, deleteUser, forgotPassword, readUser} = require('../Controller/UserController')
const AdminMW = require('./AdminMW')
const MiddleWare = require('./MiddleWare')
const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/updateUser', updateUser)
router.post('/deleteUser', deleteUser)
router.post('/forgotPassword', forgotPassword)
router.get('/readUser', readUser)

module.exports = router