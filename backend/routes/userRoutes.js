const express = require('express')
const router = express.Router();

const {protect} = require('../middleware/authMiddleware')

const {
    getUsers,
    RegisterUser,
    loginUser,
    getAuthUserData
} = require('../controllers/userController')

router.route('/').get(getUsers).post(RegisterUser)
router.route('/login').post(loginUser)
router.get('/me', protect, getAuthUserData)

module.exports = router