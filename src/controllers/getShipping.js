const getShipping = (req,res) => {
    console.log("[POST] /shipping");
    res.send({
        "rates": [
            {
                "service_name": "Aveonline",
                "service_code": "Aveonline",
                "total_price": "1",
                "description": "This is the fastest option by far",
                "currency": "USD"
            }
        ]
    })
}
module.exports = getShipping