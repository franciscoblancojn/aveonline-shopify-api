require('module-alias/register')

module.exports = { 
    get :  require("@shopify/scripts/get"),
    post :  require("@shopify/scripts/post"),
    delete :  require("@shopify/scripts/delete"),
}