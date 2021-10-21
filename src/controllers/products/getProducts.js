require("module-alias/register");
const db = require("@app/db");

const getProducts = async (req,res) => {
    try {
        const result = await db.get({
            query:req.query,
            table:"shops"
        })
        const shop = result[0]
        if(!shop){
            throw new Error("Invalid Shop")
        }
        const products = shop.products || []
        const token = shop.token
        res.send({
            type:"ok",
            products,
            token,
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