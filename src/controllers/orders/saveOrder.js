require("module-alias/register");
const db = require("@app/db");
const { generateGuia } = require("@aveonline/_index");

const saveOrder = async (req, res) => {
    try {
        const result = await db.get({
            query: req.query,
            table: "shops",
        });
        const shop = result[0];
        if (!shop) {
            throw new Error("Invalid Shop");
        }
        const order = req.body;
        const isAveonline = order.shipping_lines.find(
            (ele) => ele.source == "Aveonline"
        );
        if (isAveonline === undefined) {
            throw new Error("No Aveonline");
        }
        const respond = await generateGuia({
            ...shop,
            order: req.body
        })
        console.log(respond);
        res.send({
            type: "ok",
            respond,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            type: "error",
            msj: `${error}`,
            error,
        });
    }
};
module.exports = saveOrder;
