require("module-alias/register");
const env = require("@app/env");
const db = require("@app/db");
const log = require("@app/functions/log");

const saveConfig = async (req,res) => {
    try {
        const result = await db.put({
            where: req.query,
            data: {
                $set: {
                    config:req.body,
                },
            },
            table: `shops`,
        });
        await log({
            type: "saveConfig",
            data: {
                where: req.query,
                config:req.body,
            },
        });
        return res.send({
            type:"ok",
            msj:"Config Save",
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
module.exports = saveConfig