require('module-alias/register')

module.exports = { 
    get : require('@controllers/orders/getOrders'),
    addEnventCreate : require('@controllers/orders/addEnventCreate'),
}