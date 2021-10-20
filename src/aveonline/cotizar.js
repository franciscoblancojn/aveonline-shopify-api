require("module-alias/register");
const request = require("@functions/request");

const cotizar = async ({config,checkout}) => {
    const data = {
        "tipo"          : "cotizarDoble",
        "access"        : "",
        "token"         : "token",//pendiente
        "idempresa"     : config.cuenta,
        "origen"        : config.option_agente.find((e)=>e.value == config.agente).idciudad,
        "destino"       : "MEDELLIN(ANTIOQUIA)",//pendiente
        "idasumecosto"  : 1,
        "contraentrega" : 1,
        "valorrecaudo"  : "valorrecaudo",//pendiente
        "productos"     : "productos",//pendiente
        "valorMinimo"   : (config.valorMinimo)?1:0
    }



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
