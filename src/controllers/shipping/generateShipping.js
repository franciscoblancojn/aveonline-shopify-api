require("module-alias/register");
const db = require("@app/db");
const {shipping} = require("@shopify/_index");

const generateShipping = async (req,res) => {
    try {
        const result = await db.get({
            query:req.query,
            table:"shops"
        })
        const shop = result[0]
        if(!shop){
            throw new Error("Invalid Shop")
        }
        const respond = await shipping.get(shop)
        res.send({
            respond
        })
    } catch (error) {
        res.status(500).send({
            type:"error",
            msj:`${error}`,
            error
        })
    }
}
module.exports = generateShipping