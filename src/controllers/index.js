//require libs
require('module-alias/register')

//require db
const db = require('@app/db')
const functions = require('@functions/index')

/**
 * saveToken
 * @description save token with shop unique
 * @param {shop,token} 
 * @return {respond}
 */
exports.saveToken = async (req, res, next) =>{
    const {shop, token} = req.body;
    const create = {shop, token}
    const respond = await db.upsert({ 
        create, 
        update:{shop, token}, 
        where:{
            shop
        }, 
        table : "tokens"
    })
    res.send(respond)
}
/**
 * getToken
 * @description return token form shop
 * @param {shop} 
 * @return {respond}
 */
exports.getToken = async (req, res, next) =>{
    const {shop} = req.body;
    const respond = await db.get({
        where:{
            shop
        }, 
        table : "tokens"
    })
    res.send(respond)
}
/**
 * getMetafields
 * @description return metafields form shop
 * @param {shop,token} 
 * @return {respond}
 */
exports.getMetafields = async (req, res, next) =>{
    const {shop,token} = req.body;
    const config = {
        method: 'get',
        url: `https://${shop}/admin/api/2021-01/metafields.json`,
        headers: { 
            'X-Shopify-Access-Token': token
        },
        data : ""
    };
    const respond = await functions.request(config)
    res.send(respond)
}