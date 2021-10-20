require('module-alias/register')

module.exports = { 
    get :  require("@shopify/shipping/get"),
    post :  require("@shopify/shipping/post"),
    delete :  require("@shopify/shipping/delete"),
}