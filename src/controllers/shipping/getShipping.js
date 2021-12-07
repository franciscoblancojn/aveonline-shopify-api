require("module-alias/register");
const env = require("@app/env");
const db = require("@app/db");
const { cotizar } = require("@aveonline/_index");

const getShipping = async (req, res) => {
    try {
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
        const cotizacion = await cotizar({ config, checkout, productsShopify });

        console.log(cotizacion);

        res.send({
            rates: cotizacion,
        });
    } catch (error) {
        if (env.LOG === "TRUE") {
            console.log(error);
            await db.post({
                data: error,
                table: "logs",
            });
        }
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
