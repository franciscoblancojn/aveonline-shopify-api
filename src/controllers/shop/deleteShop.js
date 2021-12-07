require("module-alias/register");
const env = require("@app/env");
const db = require("@app/db");

const deleteShop = async (req,res) => {
    try {
        const result = await db.delete({
            where:req.query,
            table:"shops"
        })
        res.send({
            type:"ok",
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
module.exports = deleteShop