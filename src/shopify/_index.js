require('module-alias/register')

module.exports = { 
    shipping :  require("@shopify/shipping/_index"),
    products :  require("@shopify/products/_index"),
}