require('module-alias/register')
const dotenv = require('dotenv');
const nonce = require('nonce')();

dotenv.config();

exports.saveToken = async (req, res, next) => {
    const {shop, token} = req.body;
    if (shop && token) {
        next()
    } else {
        res.status(400).send({
            type:"error",
            error:'Required parameters missing'
        });
    }
}
exports.validateApiKey = async (req, res, next) => {
    const {key} = req.headers;
    if(key == process.env.APIKEY){
        next()
    } else {
        res.status(400).send({
            type:"error",
            error:'Required key'
        });
    }
}
exports.getToken = async (req, res, next) => {
    const {shop} = req.headers;
    if(shop){
        next()
    } else {
        res.status(400).send({
            type:"error",
            error:'Required shop'
        });
    }
}