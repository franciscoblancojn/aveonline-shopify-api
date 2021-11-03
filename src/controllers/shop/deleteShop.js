require("module-alias/register");
const db = require("@app/db");

const deleteShop = async (req,res) => {
    try {
        const result = await db.delete({
            where:req.query,
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
module.exports = deleteShop