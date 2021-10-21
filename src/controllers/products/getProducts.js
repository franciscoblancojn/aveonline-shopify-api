require("module-alias/register");
const db = require("@app/db");
const {products} = require("@shopify/_index");

const getProducts = async (req,res) => {
    try {
        const result = await db.get({
            query:req.query,
            table:"shops"
        })
        const shop = result[0]
        if(!shop){
            throw new Error("Invalid Shop")
        }
        const productsApi = shop.products || []
        const token = shop.token
        const productsShopify = await products.get(shop)
        res.send({
            type:"ok",
            productsApi,
            token,
            productsShopify,
        })
    } catch (error) {
        res.status(500).send({
            type:"error",
            msj:`${error}`,
            error
        })
    }
}
module.exports = getProducts