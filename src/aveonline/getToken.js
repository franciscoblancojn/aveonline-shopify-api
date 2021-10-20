require("module-alias/register");
const request = require("@functions/request");

const getToken = async ({config}) => {
    const result = await request({
        method: "POST",
        url: `https://aveonline.co/api/comunes/v1.0/autenticarusuario.php`,
        headers: {
            "Content-Type": "application/json",
        },
        data:{ 
            tipo:"auth", 
            usuario:config.user,
            clave:config.password,
        }
    });
    if(result.status === "ok"){
        return result.token
    }
    return null
};
module.exports = getToken;
