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
        if((shop.guias || []).find((e)=>e.id_order == order.id)){
            throw new Error("Guia ya generada")
        }

        const isAveonline = order.shipping_lines.find(
            (ele) => ele.source == "Aveonline"
        );
        if (isAveonline === undefined) {
            throw new Error("No Aveonline");
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

        res.send({
            type: "ok",
            saveGuia,
        });
    } catch (error) {
        console.log(error);
        if(error.type === 'errorGenerarGuia'){
            const saveError = await db.put({
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
        }
        res.status(500).send({
            type: "error",
            msj: `${error}`,
            error,
        });
    }
};
module.exports = saveOrder;
