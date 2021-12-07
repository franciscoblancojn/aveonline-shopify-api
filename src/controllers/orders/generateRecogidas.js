require("module-alias/register");
const env = require("@app/env");
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
        console.log(newGuias);
        const saveNewGuias = await db.put({
            where: req.query,
            data: {
                $set: {
                    guias : newGuias
                },
            },
            options: {
                upsert: true,
            },
            table: `shops`,
        });
        console.log(saveNewGuias);
        res.send({
            type:"ok",
            recoguidas,
            saveNewGuias
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
module.exports = generateRecogidasEnpoint