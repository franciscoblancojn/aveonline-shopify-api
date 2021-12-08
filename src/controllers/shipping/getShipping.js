require("module-alias/register");
const env = require("@app/env");
const db = require("@app/db");
const log = require("@app/functions/log");
const { cotizar } = require("@aveonline/_index");

const getShipping = async (req, res) => {
    try {
        await log({
            type: "[POST] /shipping",
            data: req.body,
        });
        const result = await db.get({
            query: req.query,
            table: "shops",
        });
        const shop = result[0];
        if (!shop) {
            throw new Error("Invalid Shop");
        }
        const config = shop.config;
        const productsShopify = shop.products;
        const checkout = req.body.rate;
        await log({
            type: "pre cotizar",
            data: {
                checkout,
                productsShopify,
                config,
            },
        });
        const cotizacion = await cotizar({ config, checkout, productsShopify });
        await log({
            type: "cotizar",
            data: cotizacion,
        });
        res.send({
            rates: cotizacion,
        });
    } catch (error) {
        await log({
            type: "error",
            data: error,
        });
        await db.put({
            where: req.query,
            data: {
                $push: {
                    errorCotizar: {
                        date: new Date().getTime(),
                        ...error,
                    },
                },
            },
            options: {
                upsert: true,
            },
            table: `shops`,
        });
        res.status(500).send({
            type: "error",
            msj: `${error}`,
            error,
        });
    }
};
module.exports = getShipping;
