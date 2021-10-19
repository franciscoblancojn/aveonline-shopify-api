require('module-alias/register')

module.exports = { 
    get : require('@controllers/tokens/getToken'),
    save : require('@controllers/tokens/saveToken'),
}