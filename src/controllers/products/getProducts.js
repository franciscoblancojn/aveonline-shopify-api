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
        const responde = await products.get(shop)
        if(responde.type !== "ok"){
            throw new Error(responde)
        }
        const productsShopify = responde.products
        const productsShopifyMap = productsShopify.map((e)=>{
            return {
                id : e.id,
                title : e.title,
                admin_graphql_api_id : e.admin_graphql_api_id,
                variants : e.variants.map((ele)=>{
                    return{
                        id : ele.id,
                        title : ele.title,
                        sku : ele.sku,
                        admin_graphql_api_id : ele.admin_graphql_api_id,
                    }
                })
            }
        })
        res.send({
            type:"ok",
            productsApi,
            token,
            productsShopify,
            productsShopifyMap
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