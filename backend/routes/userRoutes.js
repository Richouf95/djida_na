const express = require('express')
const {
    loginUser,
    signupUser,
    updateUser
} = require('../controllers/userController')

const router = express.Router()

// login 
router.post('/login', loginUser)

// signup
router.post('/signup', signupUser)

// update user
router.patch('/', updateUser)

module.exports = router