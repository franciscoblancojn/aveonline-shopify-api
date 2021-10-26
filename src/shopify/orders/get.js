require("module-alias/register");
const request = require("@functions/request");

const getOrders = async ({ shop, token }) => {
    const result = await request({
        method: "GET",
        url: `https://${shop}/admin/api/2021-10/orders.json`,
        headers: {
            "Content-Type": "application/json",
            'X-Shopify-Access-Token': token,
        },
    });
    return result
};
module.exports = getOrders;
