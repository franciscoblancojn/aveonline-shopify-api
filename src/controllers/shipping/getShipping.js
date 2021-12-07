require("module-alias/register");
const env = require("@app/env");
const db = require("@app/db");
const { cotizar } = require("@aveonline/_index");

const getShipping = async (req, res) => {
    try {
        console.log(req.body);
        if (env.LOG === "TRUE") {
            console.log("/shipping");
        }
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
        console.log(checkout);
        const cotizacion = await cotizar({ config, checkout, productsShopify });

        console.log(cotizacion);

        res.send({
            rates: cotizacion,
        });
    } catch (error) {
        console.log(error);
        if(error.type === 'Error Cotizando'){
            const saveError = await db.put({
                where: req.query,
                data: {
                    $push: {
                        errorCotizar : {
                            date : (new Date()).getTime(),
                            ...error
                        }
                    },
                },
                options: {
                    upsert: true,
                },
                table: `shops`,
            });
        }
        res.status(500).send({
            type: "error",
            msj: `${error}`,
            error,
        });
    }
};
module.exports = getShipping;
