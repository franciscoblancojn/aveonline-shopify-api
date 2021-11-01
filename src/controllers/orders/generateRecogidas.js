require("module-alias/register");
const db = require("@app/db");
const { generateRecogidas } = require("@aveonline/_index");

const generateRecogidasEnpoint = async (req,res) => {
    try {
        const {guias, note} = req.body
        const result = await db.get({
            query:req.query,
            table:"shops"
        })
        const shop = result[0]
        if(!shop){
            throw new Error("Invalid Shop")
        }
        const guiasToGenerateRecoguidas = (shop.guias || []).filter((e)=>guias.includes(e.id_order))
        const recoguidas = await generateRecogidas({
            note,
            guias: guiasToGenerateRecoguidas,
            config : shop.config,
        })
        if(recoguidas.type!="ok"){
            throw recoguidas
        }
        const newGuias = (shop.guias || []).map((e)=>{
            if(guias.includes(e.id_order)){
                e.status = "Generada"
            }
            return e
        })
        

        res.send({
            type:"ok",
            recoguidas
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
module.exports = generateRecogidasEnpoint