require("module-alias/register");
const db = require("@app/db");
const {webhooks} = require("@shopify/_index");

const addEnventCreate = async (req,res) => {
    try {
        const result = await db.get({
            query:req.query,
            table:"shops"
        })
        const shop = result[0]
        if(!shop){
            throw new Error("Invalid Shop")
        }
        const result = await webhooks.get(shop)
        res.send({
            type:"ok",
            result
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            type:"error",
            msj:`${error}`,
            error
        })
    }
}
module.exports = addEnventCreate