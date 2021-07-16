require('module-alias/register')
const dotenv = require('dotenv');
const nonce = require('nonce')();

dotenv.config();

exports.index = async (req, res, next) => {
    const {shop , session } = req.query;
    if(session){
        next()
        return
    }else if (shop) {
        const state = nonce();
        const redirectURL = process.env.SHOPIFY_APP_URL + '/auth/callback';
        const shopifyURL = 'https://' + shop +
            '/admin/oauth/request_grant?client_id=' + process.env.SHOPIFY_API_KEY +
            '&scope=' + process.env.SHOPIFY_API_SCOPES +
            '&redirect_uri=' + redirectURL +
            '&state=' + state ;
        res.cookie('state', state);
        res.redirect(shopifyURL);
        return;
    } else {
        return res.status(400).send({
            type:"error",
            error:'Missing "Shop Name" parameter!!'
        });
    }
}
exports.auth = async (req, res, next) => {
    const {shop, hmac, code, state} = req.query;
    if (shop && hmac && code) {
        next()
    } else {
        res.status(400).send({
            type:"error",
            error:'Required parameters missing'
        });
    }
}