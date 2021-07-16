const dbMonk = require('monk')('localhost/db');

exports.get = async ({collection,query={}}) => {
    var db = dbMonk.get(collection)
    var respond = await db.find(query)
    return respond
}
exports.post = async ({collection,data}) => {
    var db = dbMonk.get(collection)
    var respond = await db.insert(data)
    return respond
}