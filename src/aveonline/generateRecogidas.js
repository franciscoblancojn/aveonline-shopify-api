require("module-alias/register");
const request = require("@functions/request");
const getToken = require("@aveonline/getToken");

const generateRecogidas = async ({config, guias, note}) => {
    const data = {
        "tipo"              : "generarRecogida2",
        "token"             : await getToken({ config }),
        "idempresa"         : config.cuenta,
        "idagente"          : config.agente,
        "dscom"             : note,
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
module.exports = generateRecogidas