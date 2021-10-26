require('module-alias/register')

module.exports = { 
    get :  require("@shopify/webhooks/get"),
    post :  require("@shopify/webhooks/post"),
    delete :  require("@shopify/webhooks/delete"),
}