require("module-alias/register");
const request = require("@functions/request");

const deleteShippings = async ({ shop, token, id }) => {
    const result = await request({
        method: "DELETE",
        url: `https://${shop}/admin/api/2021-10/carrier_services/${id}.json`,
        headers: {
            "Content-Type": "application/json",
            'X-Shopify-Access-Token': token,
        },
    });
    return result
};
module.exports = deleteShippings;
