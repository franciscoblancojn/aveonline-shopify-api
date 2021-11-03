require('module-alias/register')

module.exports = { 
    get : require('@controllers/shop/getShop'),
    delete : require('@controllers/shop/deleteShop'),
}