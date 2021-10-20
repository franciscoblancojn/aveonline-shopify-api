require("module-alias/register");
const request = require("@functions/request");
const getToken = require("@aveonline/getToken");

const cotizar = async ({config,checkout}) => {
    if(checkout.currency !== "COP" || checkout.destination.country !== "CO"){
        return null
    }
    console.log(checkout);
    var valorrecaudo = 0
    const products =  checkout.items.map((e)=>{
        valorrecaudo += e.quantity * e.price
        return {
            "alto":1,//pendiente
            "largo":1,//pendiente
            "ancho":1,//pendiente
            "peso": e.grams / 1000,
            "unidades": e.quantity, 
            "valorDeclarado": e.price,//pendiente  valor declarado custom
        }
    })
    const data = {
        "tipo"          : "cotizarDoble",
        "access"        : "",
        "token"         : getToken({config}),
        "idempresa"     : config.cuenta,
        "origen"        : config.option_agente.find((e)=>e.value == config.agente).idciudad,
        "destino"       : "MEDELLIN(ANTIOQUIA)",//pendiente
        "idasumecosto"  : 1,
        "contraentrega" : 1,
        "valorrecaudo"  : valorrecaudo,
        "productos"     : products,//pendiente
        "valorMinimo"   : (config.valorMinimo)?1:0
    }
    return data


    const result = await request({
        method: "POST",
        url: ``,
        headers: {
            "Content-Type": "application/json",
        },
    });
    return result
};
module.exports = cotizar;
