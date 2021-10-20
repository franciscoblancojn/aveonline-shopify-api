require('module-alias/register')
var axios = require('axios');

module.exports = async (config) => {
    try {
        const response = await axios(config)
        const data = response.data
        return {
            type:"ok",
            ...data
        }
    } catch (error) {
        return {
            type:"error",
            msj:`${error}`,
            error
        }
    }
}
