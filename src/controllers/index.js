require('module-alias/register')
const crypto = require('crypto');
const request = require('request-promise');
const querystring = require('querystring');
const dotenv = require('dotenv');
const functions = require('@functions/index')
const db = require('@app/db')

const fs = require('fs');

dotenv.config();

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