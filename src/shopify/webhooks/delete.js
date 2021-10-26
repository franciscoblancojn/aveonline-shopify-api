require("module-alias/register");
const request = require("@functions/request");

const deleteWebhooks = async ({ shop, token, id }) => {
    const result = await request({
        method: "DELETE",
        url: `https://${shop}/admin/api/2021-10/webhooks/${id}.json`,
        headers: {
            "Content-Type": "application/json",
            'X-Shopify-Access-Token': token,
        },
    });
    return result
};
module.exports = deleteWebhooks;
