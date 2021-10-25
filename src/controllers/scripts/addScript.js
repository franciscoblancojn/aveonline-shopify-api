require("module-alias/register");
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
        if(1===1){
            await scripts.post({
                ...shop,
                data:{
                    event:"order_status",
                    src:""
                }
            })

        }
        res.send({
            script_tags
        })
    } catch (error) {
        res.status(500).send({
            type:"error",
            msj:`${error}`,
            error
        })
    }
}
module.exports = addScript