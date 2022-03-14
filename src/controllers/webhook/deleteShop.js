require("module-alias/register");
const env = require("@app/env");
const db = require("@app/db");
const log = require("@app/functions/log");

const deleteShop = async (req, res) => {
    try {
        await log({
            type: "deleteShop",
            data: {
                method: req.method,
                header: req.header,
                query: req.query,
                body: req.body,
            },
        });

        const { accessToken } = req.body;

        if (!accessToken) {
            res.status(401).send({
                type: "error",
                msj: "accessToken is required",
            });
        }
        const result = await db.get({
            query: req.query,
            table: "shops",
            query: {
                token: accessToken,
            },
        });
        const shop = result[0];

        if (!shop) {
            res.status(401).send({
                type: "error",
                msj: "accessToken is invalid",
            });
        }

        return res.send({
            type: "ok",
        });
    } catch (error) {
        await log({
            type: "error",
            data: error,
        });
        res.status(500).send({
            type: "error",
            msj: `${error}`,
            error,
        });
    }
};
module.exports = deleteShop;
