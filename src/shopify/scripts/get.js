require("module-alias/register");
const request = require("@functions/request");

const getScripts = async ({ shop, token }) => {
    const result = await request({
        method: "GET",
        url: `https://${shop}/admin/api/2021-10/script_tags.json`,
        headers: {
            "Content-Type": "application/json",
            'X-Shopify-Access-Token': token,
        },
    });
    return result
};
module.exports = getScripts;
