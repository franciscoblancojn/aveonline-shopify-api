require("module-alias/register");
const env = require("@app/env");
const db = require("@app/db");
const log = require("@app/functions/log");

const getShop = async (req,res) => {
    try {
        const result = await db.get({
            query:req.query,
            table:"shops"
        })
        await log({
            type: "getShop",
            data: {
                where:req.query,
                result
            },
        });
        res.send({
            type:"ok",
            result
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
module.exports = getShop