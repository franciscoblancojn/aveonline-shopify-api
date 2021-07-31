//require libs 
require('module-alias/register')
const dotenv = require('dotenv');
const nonce = require('nonce')();

//init process.env
dotenv.config();

/**
 * validateToken
 * @description verify toke form body
 * @param {shop,token} 
 * @return {next()/send(error)}
 */
exports.validateToken = async (req, res, next) => {
    const {token} = req.body;
    if (token) {
        next()
    } else {
        res.status(400).send({
            type:"error",
            error:'Required token'
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
    const {key} = req.body;
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
 * validateShop
 * @description verify shop form body 
 * @param {shop} 
 * @return {next()/send(error)}
 */
exports.validateShop = async (req, res, next) => {
    const {shop} = req.body;
    if(shop){
        next()
    } else {
        res.status(400).send({
            type:"error",
            error:'Required shop'
        });
    }
}