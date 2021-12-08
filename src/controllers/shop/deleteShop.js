require("module-alias/register");
const env = require("@app/env");
const db = require("@app/db");
const log = require("@app/functions/log");

const deleteShop = async (req,res) => {
    try {
        const result = await db.delete({
            where:req.query,
            table:"shops"
        })
        await log({
            type: "deleteShop",
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
module.exports = deleteShop