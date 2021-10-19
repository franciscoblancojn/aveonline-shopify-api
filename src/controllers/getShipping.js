const getShipping = (req,res) => {
    console.log("[POST] /shipping");
    res.send({
        "rates": [
            {
                "service_name": "Aveonlineapp",
                "service_code": "Aveonlineapp",
                "total_price": "1000000",
                "description": "This is the fastest option by far",
                "currency": "COP"
            }
        ]
    })
}
module.exports = getShipping