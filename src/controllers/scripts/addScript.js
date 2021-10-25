require("module-alias/register");
const {scripts} = require("@shopify/_index");

const addScript = async (req,res) => {
    try {
        const result = await scripts.get()
        res.send({
            result
        })
    } catch (error) {
        res.status(500).send({
            type:"error",
            msj:`${error}`,
            error
        })
    }
}
module.exports = addScript