require("module-alias/register");
const db = require("@app/db");

const getProducts = async (req,res) => {
    try {
        const result = await db.get({
            query:req.query,
            table:"shops"
        })
        res.send({
            type:"ok",
            result
        })
    } catch (error) {
        res.status(500).send({
            type:"error",
            msj:`${error}`,
            error
        })
    }
}
module.exports = getProducts