require('module-alias/register')

module.exports = { 
    get : require('@controllers/shipping/getShipping'),
    generate : require('@controllers/shipping/generateShipping'),
}