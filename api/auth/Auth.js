const db = require('../model/db')
const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

const verifyKey = (req, res , next) => {
    const token = req.headers.authorization

    if(!token) {
        return res.status(401).json({Error: "Brak Tokena JWT"})
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if(err){
            return res.status(401).json({Error: "Nieprawidłowy token JWT"})
        }
        req.user = decoded()
        next()
    })
        
}

router.post('/login', (req, res) => {
    
})

router.post('register', (req, res) => {

})

module.exports = router