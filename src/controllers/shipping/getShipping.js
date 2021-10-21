require("module-alias/register");
const db = require("@app/db");
const {cotizar} = require("@aveonline/_index");

const getShipping = async (req,res) => {
   try {
        const result = await db.get({
            query:req.query,
            table:"shops"
        })
        const shop = result[0]
        if(!shop){
            throw new Error("Invalid Shop")
        }
        const config = shop.config
        const checkout = req.body.rate
        console.log(checkout);
        const cotizacion = await cotizar({config,checkout})

        console.log(cotizacion);

        res.send({
            "rates": cotizacion
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
module.exports = getShipping