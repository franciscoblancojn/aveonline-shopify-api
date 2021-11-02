require("module-alias/register");
const request = require("@functions/request");
const getToken = require("@aveonline/getToken");

const generateRelacionEnvio = async ({config, guias}) => {
    const guiasTransportadora = {}
    guias.forEach(ele => {
        guiasTransportadora[ele.codeTransportador] = [...(guiasTransportadora[ele.codeTransportador] || []),ele.numguia]
    });
    const transportadores = Object.keys(guiasTransportadora)
    const result = []
    for (var i = 0; i < transportadores.length; i++) {
        const transportador = transportadores[i];
        const data = {
            "tipo"              : "relacionEnvios",
            "token"             : await getToken({ config }),
            "idempresa"         : config.cuenta,
            "transportadora"    : transportador,//pendiente
            "guias"             : guiasTransportadora[transportador]
        }
        console.log(data);
        // result.push( await request({
        //     method: "POST",
        //     url: "https://aveonline.co/api/nal/v1.0/generarGuiaTransporteNacional.php",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     data,
        // }))
        
    }
    return result
    
}
module.exports = generateRelacionEnvio