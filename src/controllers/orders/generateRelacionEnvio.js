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
        console.log(relacion);
        if(!relacion){
            throw relacion
        }
        var swError = false
        const errorsR = []
        for (var i = 0; i < relacion.length; i++){
            const rel = relacion[i]
            if(rel.type!="ok"){
                errorsR.push(rel)
                swError = true
            }else if(rel.status!="ok"){
                errorsR.push(rel)
                swError = true
            }else{
                const guias = shop.guias.map((e)=>{
                    if(rel.guias.includes(e.numguia)){
                        e.relacionDeEnvio = rel.relacionenvio
                        e.relacionDeEnvioUrl = rel.rutaimpresion
                        e.relacionDeEnvioFecha = rel.fecha
                        e.statusRelacion = "Generada"
                    }
                    return e
                })
                await db.put({
                    where: req.query,
                    data: {
                        $set: {
                            guias
                        },
                    },
                    options: {
                        upsert: true,
                    },
                    table: `shops`,
                });
            }
        }
        if(swError){
            throw errorsR
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