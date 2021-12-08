require("module-alias/register");
const env = require("@app/env");
const db = require("@app/db");
const log = require("@app/functions/log");
const { webhooks } = require("@shopify/_index");

const addEnventCreate = async (req, res) => {
    try {
        const result = await db.get({
            query: req.query,
            table: "shops",
        });
        const shop = result[0];
        if (!shop) {
            throw new Error("Invalid Shop");
        }
        const respond = await webhooks.get(shop);
        if (respond.type !== "ok") {
            throw respond;
        }
        const listWebHooks = respond.webhooks;

        const urlSaveOrder = `https://aveonline.startscoinc.com/api/v1/orders/save?shop=${shop.shop}`;

        const webHook = listWebHooks.find((e) => e.address == urlSaveOrder);

        if (webHook === undefined) {
            const result = webhooks.post({
                ...shop,
                data: {
                    webhook: {
                        topic: "orders/create",
                        address: urlSaveOrder,
                        format: "json",
                    },
                },
            });
            await log({
                type: "addWebHooks",
                data: result,
            });
            return res.send({
                type: "ok",
                msj: "webHooks save",
            });
        }
        await log({
            type: "listWebHooks",
            data: listWebHooks,
        });

        return res.send({
            type: "ok",
            listWebHooks,
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
module.exports = addEnventCreate;
