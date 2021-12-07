require("module-alias/register");
const env = require("@app/env");
const db = require("@app/db");
const {webhooks} = require("@shopify/_index");

const addEnventCreate = async (req,res) => {
    try {
        const result = await db.get({
            query:req.query,
            table:"shops"
        })
        const shop = result[0]
        if(!shop){
            throw new Error("Invalid Shop")
        }
        const respond = await webhooks.get(shop)
        if(respond.type!=="ok"){
            throw respond
        }
        const listWebHooks = respond.webhooks

        const urlSaveOrder = `https://aveonline.startscoinc.com/api/v1/orders/save?shop=${shop.shop}`

        const webHook = listWebHooks.find((e)=>e.address == urlSaveOrder)

        if(webHook === undefined){
            webhooks.post({
                ...shop,
                data:{
                    webhook:{
                        topic:"orders/create",
                        address:urlSaveOrder,
                        format:"json",
                    }
                }
            })
            return res.send({
                type:"ok",
                msj:"webHooks save"
            })
        }
        
        return res.send({
            type:"ok",
            listWebHooks
        })
    } catch (error) {
        if (env.LOG === "TRUE") {
            console.log(error);
            await db.post({
                data: error,
                table: "logs",
            });
        }
        res.status(500).send({
            type:"error",
            msj:`${error}`,
            error
        })
    }
}
module.exports = addEnventCreate