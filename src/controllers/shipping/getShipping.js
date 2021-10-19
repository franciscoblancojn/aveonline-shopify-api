require("module-alias/register");
const db = require("@app/db");

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
        res.send({
            "rates": [
                {
                    "service_name": "Aveonline",
                    "service_code": "Aveonline",
                    "total_price": "1000000",
                    "description": "This is the fastest option by far",
                    "currency": "COP"
                }
            ]
        })
   } catch (error) {
        res.status(500).send({
            type:"error",
            msj:`${error}`,
            error
        })
   }
}
module.exports = getShipping