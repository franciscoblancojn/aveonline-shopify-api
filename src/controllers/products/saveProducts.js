require("module-alias/register");
const env = require("@app/env");
const db = require("@app/db");
const log = require("@app/functions/log");

const saveProducts = async (req,res) => {
    try {
        const result = await db.put({
            where: req.query,
            data: {
                $set: {
                    products:req.body,
                },
            },
            table: `shops`,
        });
        return res.send({
            type:"ok",
            msj:"Products Save",
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
module.exports = saveProducts