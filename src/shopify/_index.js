require('module-alias/register')

module.exports = { 
    shipping :  require("@shopify/shipping/_index"),
    products :  require("@shopify/products/_index"),
    scripts :  require("@shopify/scripts/_index"),
    orders :  require("@shopify/orders/_index"),
    webhooks :  require("@shopify/webhooks/_index"),
}