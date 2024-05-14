const express = require('express')
const {getAllProducts} = require('../controllers/productsController')
const router = express.Router()

router.get('/all',  (req, res) => {
    getAllProducts(req, res);
})

module.exports = router
