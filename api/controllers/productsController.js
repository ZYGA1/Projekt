const db = require('../model/db')

const getAllProducts = async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM produkty')
        console.log(result)
        res.status(200).send(result)
    }
    catch (err){
        res.status(500).send("Internal Server Error")
    }
}

module.exports = {
    getAllProducts
}