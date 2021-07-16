require('module-alias/register')
const db = require('@app/db.js')

exports.saveToken = async (shop,accessToken) => {
    const r = await db.upsert({
        table:"tokens",
        create : {
            host : shop,
            token : accessToken
        },
        update : {
            host : shop,
            token : accessToken
        },
        where : {
            host : shop
        },
    })
    return r
}