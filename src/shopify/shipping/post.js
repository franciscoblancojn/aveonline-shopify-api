require("module-alias/register");
const request = require("@functions/request");

const postShippings = async ({ shop, token, data }) => {
    const result = await request({
        method: "POST",
        url: `https://${shop}/admin/api/2021-10/carrier_services.json`,
        headers: {
            "Content-Type": "application/json",
            'X-Shopify-Access-Token': token,
        },
        data
    });
    return result
};
module.exports = postShippings;
