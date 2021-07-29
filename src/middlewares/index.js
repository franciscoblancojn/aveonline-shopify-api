//require libs 
require('module-alias/register')
const dotenv = require('dotenv');
const nonce = require('nonce')();

//init process.env
dotenv.config();

/**
 * saveToken
 * @description verify shop and toke form body for save
 * @param {shop,token} 
 * @return {next()/send(error)}
 */
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
/**
 * validateApiKey
 * @description verify key form headers with .env.APIKEY
 * @param {key} 
 * @return {next()/send(error)}
 */
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
/**
 * getToken
 * @description verify shop form headers for return token
 * @param {shop} 
 * @return {next()/send(error)}
 */
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