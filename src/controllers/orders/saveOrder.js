require("module-alias/register");
const env = require("@app/env");
const db = require("@app/db");
const log = require("@app/functions/log");
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
        if((shop.guias || []).find((e)=>e.id_order == order.id)){
            throw {
                type:"Guia ya generada",
            }
        }

        const isAveonline = order.shipping_lines.find(
            (ele) => ele.source == "Aveonline"
        );
        if (isAveonline === undefined) {
            throw {
                type:"no Aveonline",
            }
        }
        const respond = await generateGuia({
            ...shop,
            order
        })
        if(respond.status == 'error'){
            throw {
                type:"errorGenerarGuia",
                respond
            }
        }
        const {guia} = respond.resultado
        delete guia.archivoguia
        delete guia.archivorotulo
        guia.id_order = order.id
        const saveGuia = await db.put({
            where: req.query,
            data: {
                $push: {
                    guias : {
                        date : (new Date()).getTime(),
                        ...guia
                    }
                },
            },
            options: {
                upsert: true,
            },
            table: `shops`,
        });

        return res.status(200).send("OK");
    } catch (error) {
        await log({
            type: "error",
            data: error,
        });
        if(error.type === 'errorGenerarGuia'){
            await db.put({
                where: req.query,
                data: {
                    $push: {
                        errorGenerarGuia : {
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
            return res.status(200).send("OK");
        }
        if(["Guia ya generada","no Aveonline"].includes(error.type)){
            return res.status(200).send("OK");
        }
        res.status(500).send({
            type: "error",
            msj: `${error}`,
            error,
        });
    }
};
module.exports = saveOrder;
