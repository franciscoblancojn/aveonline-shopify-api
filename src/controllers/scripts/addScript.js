require("module-alias/register");
const env = require("@app/env");
const db = require("@app/db");
const {scripts} = require("@shopify/_index");

const addScript = async (req,res) => {
    try {
        const result = await db.get({
            query:req.query,
            table:"shops"
        })
        const shop = result[0]
        if(!shop){
            throw new Error("Invalid Shop")
        }
        const respond = await scripts.get(shop)
        if(respond.type !== "ok"){
            throw new Error("No se puede leer los Scripts")
        }
        const {script_tags} = respond
        const src = "https://aveonline.startscoinc.com/api/v1/public/js/checkout.js"
        const scriptAveonline = script_tags.find((e)=>e.src == src)

        if(scriptAveonline === undefined){
            const r = await scripts.post({
                ...shop,
                data:{
                    script_tag:{
                        event:"onload",
                        display_scope: "all",
                        src
                    }
                }
            })
            return res.send(r)
        }
        res.send({
            "type": "ok",
            script_tags
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
module.exports = addScript