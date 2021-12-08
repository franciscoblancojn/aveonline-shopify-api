require("module-alias/register");
const env = require("@app/env");
const db = require("@app/db");
const log = require("@app/functions/log");

const getOrders = async (req,res) => {
    try {
        const result = await db.get({
            query:req.query,
            table:"shops"
        })
        const shop = result[0]
        if(!shop){
            throw new Error("Invalid Shop")
        }
        const orders = (shop.guias || []).reverse()
        res.send({
            type:"ok",
            orders,
        })
    } catch (error) {
        await log({
            type: "error",
            data: error,
        });
        res.status(500).send({
            type:"error",
            msj:`${error}`,
            error
        })
    }
}
module.exports = getOrders