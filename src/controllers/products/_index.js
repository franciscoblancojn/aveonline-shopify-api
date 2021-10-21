require('module-alias/register')

module.exports = { 
    get : require('@controllers/products/getProducts'),
    save : require('@controllers/products/saveProducts'),
}