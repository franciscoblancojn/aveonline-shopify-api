require("module-alias/register");
const axios = require("axios");
const db = require("@app/db");
const env = require("@app/env");
const log = require("@app/functions/log");

module.exports = async (config) => {
    try {
        const response = await axios(config);
        const data = response.data;
        await log({
            type: "request",
            data: {
                send: config,
                result: data,
            },
        });
        return {
            type: "ok",
            ...data,
        };
    } catch (error) {
        await log({
            type: "error",
            data: error,
        });
        return {
            type: "error",
            msj: `${error}`,
            error,
        };
    }
};
