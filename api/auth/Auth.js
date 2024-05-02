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

const newKey = (key, user, fn) => {
    jwt.sign(user, key, {expiresIn: 60 * 60}, (err, token) => {
        if(err) console.log(err)
        else fn(token)
    })
}

router.post('/login', (req, res) => {
    res.set('x-powered-by', 'zyga')
    const data = req.body.data
    console.log(data)
    const verifyUser = async (login, haslo_hash) => {
        try{
            const [result] = await db.query('Select login, haslo_hash from uzytkownicy where login = ?', [login])
            if(result[0] != undefined){
                if (login === result[0].login){
                    const [resHaslo] = await db.query('Select haslo_hash, id from uzytkownicy where login = ?', [login])
                    if(haslo_hash === resHaslo[0].haslo_hash){
                        newKey(process.env.JWT_SECRET_KEY, {id: resHaslo[0].id, login: result[0].login}, (token) => {
                            res.status(200).json({Access: "Granted", jwt_token: token})
                        })
                } 
                else{
                    res.status(401).json({Access: "Denied", Error: "Wrong password"})
                }
                } 
            }
            else{
                res.status(401).json({Access: "Denied", Error: "Wrong login or password"})
            }
        }
        catch(err){
            console.log(err)
        }

    }

    if(data){
        verifyUser(data.login, data.haslo_hash)
    }
    else{
        res.status(400).json({Error: "no data served"})
    }
})

router.post('register', (req, res) => {

})

module.exports = router