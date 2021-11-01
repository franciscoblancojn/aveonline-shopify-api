require('module-alias/register')

module.exports = { 
    get : require('@controllers/orders/getOrders'),
    save : require('@controllers/orders/saveOrder'),
    addEnventCreate : require('@controllers/orders/addEnventCreate'),
    generateGuias : require('@controllers/orders/generateGuias'),
}