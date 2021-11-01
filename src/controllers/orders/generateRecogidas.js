require("module-alias/register");
const db = require("@app/db");
const { generateRecogidas } = require("@aveonline/_index");

const generateRecogidas = async (req,res) => {
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
        const guiasToGenerateRecoguidas = (shop.guias || []).filter((e)=>guias.includes(e.id_order))
        const recoguidas = await generateRecogidas(guiasToGenerateRecoguidas)
        res.send({
            type:"ok",
            guiasToGenerateRecoguidas,
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
module.exports = generateRecogidas