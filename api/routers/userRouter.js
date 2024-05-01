const express = require('express')
const userController = require('../controllers/userController')
const router = express.Router()

router.get('/all' , (req, res) => {
    userController.getAllUsers(req, res)
})

router.get('/:id' , userController.getUserById)

module.exports = router