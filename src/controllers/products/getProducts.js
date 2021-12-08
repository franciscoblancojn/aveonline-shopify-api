require("module-alias/register");
const env = require("@app/env");
const db = require("@app/db");
const log = require("@app/functions/log");
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
                        ...productsApi.find((element)=>ele.id === element.id)
                    }
                })
            }
        })
        return res.send({
            type:"ok",
            products:productsShopifyMap
        })
    } catch (error) {
        await log({
            type: "error",
            data: error,
        });
        res.status(500).send({
            type:"error",
            msj:`${error}`,
            error
        })
    }
}
module.exports = getProducts