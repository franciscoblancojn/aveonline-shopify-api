require("module-alias/register");
const request = require("@functions/request");

const getProducts = async ({ shop, token }) => {
    const result = await request({
        method: "GET",
        url: `https://${shop}/admin/api/2021-10/products.json`,
        headers: {
            "Content-Type": "application/json",
            'X-Shopify-Access-Token': token,
        },
    });
    return result
};
module.exports = getProducts;
