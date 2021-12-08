require("module-alias/register");
const env = require("@app/env");
const db = require("@app/db");
const log = require("@app/functions/log");
const {shipping} = require("@shopify/_index");

const generateShipping = async (req,res) => {
    try {
        const result = await db.get({
            query:req.query,
            table:"shops"
        })
        const shop = result[0]
        if(!shop){
            throw new Error("Invalid Shop")
        }
        const respond = await shipping.get(shop)
        const {carrier_services} = respond
        if(!carrier_services){
            console.log(respond);
            throw new Error(respond)
        }
        const shippingAve = carrier_services.find((e)=>e.name === "Aveonline")
        if(shippingAve !== undefined){
            const deleteCarrier = await shipping.delete({
                ...shop,
                id:shippingAve.id
            })
            console.log("deleteCarrier",deleteCarrier);
        }
        const newCarrier = await shipping.post({
            ...shop,
            data:{
                "carrier_service": {
                    "name": "Aveonline",
                    "callback_url": `${env.URLAPI}/shipping?shop=${shop.shop}`,
                    "service_discovery": true
                }
            }
        })
        await log({
            type: "newCarrier",
            data: newCarrier,
        });
        res.send(newCarrier)
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
module.exports = generateShipping