require("module-alias/register");
const db = require("@app/db");
const { generateRelacionEnvio } = require("@aveonline/_index");

const generateRelacionEnvioEnpoint = async (req,res) => {
    try {
        const {guias} = req.body
        const result = await db.get({
            query:req.query,
            table:"shops"
        })
        const shop = result[0]
        if(!shop){
            throw new Error("Invalid Shop")
        }
        const guiasToGenerateRelacion = (shop.guias || []).filter((e)=>guias.includes(e.id_order))
        const relacion = await generateRelacionEnvio({
            guias: guiasToGenerateRelacion,
            config : shop.config,
        })
        if(relacion.type!="ok"){
            throw relacion
        }
        res.send({
            type:"ok",
            relacion,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            type:"error",
            msj:`${error}`,
            error
        })
    }
}
module.exports = generateRelacionEnvioEnpoint