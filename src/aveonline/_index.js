require('module-alias/register')

module.exports = { 
    cotizar :  require("@aveonline/cotizar"),
    getToken :  require("@aveonline/getToken"),
    generateGuia :  require("@aveonline/generateGuia"),
    generateRecogidas :  require("@aveonline/generateRecogidas"),
    generateRelacionEnvio :  require("@aveonline/generateRelacionEnvio"),
}