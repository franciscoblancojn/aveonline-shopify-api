//require libs
require('module-alias/register')

//require db
const db = require('@app/db')

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
    const {shop} = req.headers;
    const respond = await db.get({
        where:{
            shop
        }, 
        table : "tokens"
    })
    res.send(respond)
}