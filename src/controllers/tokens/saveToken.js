require("module-alias/register");
const env = require("@app/env");
const db = require("@app/db");
const log = require("@app/functions/log");

const saveToken = async (req, res) => {
    try {
        const result = await db.put({
            where: req.query,
            data: {
                $set: {
                    ...req.query,
                    ...req.body,
                },
            },
            options: {
                upsert: true,
            },
            table: `shops`,
        });
        res.send({
            type:"ok",
            msj:"Token Save",
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
};
module.exports = saveToken;
