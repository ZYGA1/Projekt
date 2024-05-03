const db = require('../model/db')
const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

const verifyKey = (token, res) => {

    if(!token) {
        res.status(401).json({
            verified: false,
            Error: "No JWT token"
        }) 
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if(err){
            res.status(401).json({
                verified: false,
                Error: "Wrong JWT token"
            })
        } 
        else{
            res.status(200).json(
                {
                    verified: true,
                    user: {
                        id: decoded.id,
                        login: decoded.login
                    }
                })
        }
        
    })       
}

const newKey = (key, user, fn) => {
    jwt.sign(user, key, {expiresIn: 60 * 60}, (err, token) => {
        if(err) console.log(err)
        else fn(token)
    })
}

router.post('/verify', (req, res) => {
    verifyKey(req.headers.authorization.split(' ')[1], res)
})

router.post('/login', (req, res) => {
    res.set('x-powered-by', 'zyga')
    const data = req.body.data

    const verifyUser = async (login, haslo_hash) => {
        try{
            const [result] = await db.query('Select login, haslo_hash from uzytkownicy where login = ?', [login])
            if(result[0] != undefined){
                if (login === result[0].login){
                    const [resHaslo] = await db.query('Select haslo_hash, id from uzytkownicy where login = ?', [login])
                    if(haslo_hash === resHaslo[0].haslo_hash){
                        newKey(process.env.JWT_SECRET_KEY, {id: resHaslo[0].id, login: result[0].login}, (token) => {
                            res.cookie('jwt_token', token, {maxAge: 60*60*1000, secure: true, sameSite: 'none'})
                            res.status(200).json({Access: "Granted", jwt_token: token})
                        })
                    }
                    else{
                        res.status(401).json({Access: 'Denied', Error: 'Wrong password'})
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

router.post('/register', async (req, res) => {

    try {
        [result] = await db.query('Insert into uzytkownicy(email, login, haslo_hash, data_utworzenia) values (?, ?, ?, ?)', [req.body.email, req.body.login, req.body.haslo, '2024-05-03'])
        
        if(result.affectedRows > 0){
            newKey(process.env.JWT_SECRET_KEY, {id: result.insertId, login: req.body.login}, (token) => {
                res.cookie('jwt_token', token, {maxAge: 60*60*1000, secure: true, sameSite: 'none'})
                res.status(200).json({Access: "Created", jwt_token: token})
            })
        }
    }
    catch(err) {
        console.log(err)
        res.json({Error: "Server Ezrror"})
    }

})

module.exports = router