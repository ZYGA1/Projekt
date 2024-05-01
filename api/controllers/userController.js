const db = require('../model/db')

getAllUsers = async (req, res) => {
    res.removeHeader('x-powered-by')
    getUsers = async () => {
        [result] = await db.query('Select * from uzytkownicy')
        return result
    }

    res.json(await getUsers())
}

getUserById = async (req, res) => {
    const userId = req.params.id
    validateId = async (id) => {
        try{
            [result] = await db.query('Select * from uzytkownicy where id = ?' , [id])
            if (result[0] == undefined) return false
            else return true
        }
        catch(err){
            console.log("[ERR] Bład walidacji ID użytkownika : ")
            console.log(err)
            return false
        }
    }

    try{
        if(await validateId(userId)){
            [result] = await db.query('Select * from uzytkownicy where id = ?' , [userId])
            res.status(200).json(result)
        } else{
            res.json({Error: "Taki uzytkownik nie istnieje"})
        }
    }
    catch(err){
        console.log("[ERR] Bład Zapytania")
        console.log(err)
        res.status(500).json({Error: "Server Error"})
    }
   
}


module.exports = {
    getAllUsers,
    getUserById
}