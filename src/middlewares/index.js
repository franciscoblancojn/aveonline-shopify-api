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
    const {ApiKey,shop} = req.query;
    if(ApiKey == process.env.APIKEY && shop){
        next()
    } else {
        res.status(400).send({
            type:"error",
            error:'Required ApiKey'
        });
    }
}