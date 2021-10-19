//require libs
require('module-alias/register')

//require db
const db = require('@app/db')

const getShipping = (req,res) => {
    console.log("[POST] /shipping");
    const {shop} = req.query
    res.send({
        "rates": [
            {
                "service_name": "Aveonline",
                "service_code": "Aveonline",
                "total_price": "1000000",
                "description": "This is the fastest option by far",
                "currency": "COP"
            }
        ]
    })
}
module.exports = getShipping