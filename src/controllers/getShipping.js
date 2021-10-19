const getShipping = (req,res) => {
    console.log("[POST] /shipping");
    const {shop} = req.query
    res.send({
        "rates": [
            {
                "service_name": "Aveonline"+shop,
                "service_code": "Aveonline",
                "total_price": "1000000",
                "description": "This is the fastest option by far",
                "currency": "COP"
            }
        ]
    })
}
module.exports = getShipping