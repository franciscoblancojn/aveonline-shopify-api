require("module-alias/register");
const db = require("@app/db");
const {orders} = require("@shopify/_index");

const getOrders = async (req,res) => {
    try {
        const result = await db.get({
            query:req.query,
            table:"shops"
        })
        const shop = result[0]
        if(!shop){
            throw new Error("Invalid Shop")
        }
        const responde = await orders.get(shop)
        if(responde.type !== "ok"){
            throw responde
        }
        const ordersR = responde.orders.filter((e)=>e.shipping_lines.find((ele)=>ele.source=="Aveonline")!==undefined)
        res.send({
            type:"ok",
            orders:ordersR
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
module.exports = getOrders