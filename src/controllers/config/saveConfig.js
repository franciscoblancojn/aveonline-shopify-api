require("module-alias/register");
const env = require("@app/env");
const db = require("@app/db");

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
        return res.send({
            type:"ok",
            msj:"Config Save",
            result
        })
    } catch (error) {
        if (env.LOG === "TRUE") {
            console.log(error);
            await db.post({
                data: error,
                table: "logs",
            });
        }
        res.status(500).send({
            type:"error",
            msj:`${error}`,
            error
        })
    }
}
module.exports = saveConfig