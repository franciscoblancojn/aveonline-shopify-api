require("module-alias/register");
const env = require("@app/env");
const db = require("@app/db");
const log = require("@app/functions/log");

const getClient = async (req,res) => {
    try {
        await log({
            type: "getClient",
            data: {
                method : req.method,
                header: req.header,
                query: req.query,
                body:req.body,
            },
        });
        return res.send({
            type:"ok",
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
module.exports = getClient