require('module-alias/register')

module.exports = { 
    deleteClient : require('@controllers/webhook/deleteClient'),
    deleteShop : require('@controllers/webhook/deleteShop'),
    getClient : require('@controllers/webhook/getClient'),
}