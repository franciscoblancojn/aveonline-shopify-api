require("module-alias/register");
const db = require("@app/db");

const saveConfig = async (req,res) => {
    try {
        const result = await db.put({
            where: req.query,
            data: {
                $set: {
                    ...req.body,
                },
            },
            table: `shops`,
        });
        res.send({
            type:"ok",
            msj:"Config Save",
            result
        })
    } catch (error) {
        res.status(500).send({
            type:"error",
            msj:`${error}`,
            error
        })
    }
}
module.exports = saveConfig