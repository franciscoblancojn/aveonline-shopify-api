require("module-alias/register");
const request = require("@functions/request");
const getToken = require("@aveonline/getToken");

const generateRelacionEnvio = async ({config, guias}) => {
    const data = {
        "tipo"              : "relacionEnvios",
        "token"             : await getToken({ config }),
        "idempresa"         : config.cuenta,
        "transportadora"    : "",//pendiente
        "guias"             : guias.map((e)=>e.numguia)
    }
    console.log(data);
    const result = await request({
        method: "POST",
        url: "https://aveonline.co/api/nal/v1.0/generarGuiaTransporteNacional.php",
        headers: {
            "Content-Type": "application/json",
        },
        data,
    })
    return result
    
}
module.exports = generateRelacionEnvio