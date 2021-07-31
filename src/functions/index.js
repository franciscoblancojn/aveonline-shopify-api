require('module-alias/register')
var axios = require('axios');

exports.request = async (config) => {
    try {
        const response = await axios(config)
        const data = response.data
        return {
            type:"ok",
            data
        }
    } catch (error) {
        return {
            type:"error",
            error:`${error}`
        }
    }
}
