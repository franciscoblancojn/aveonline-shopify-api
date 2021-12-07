require("module-alias/register");
const axios = require("axios");
const db = require("@app/db");
const env = require("@app/env");

module.exports = async (config) => {
    try {
        const response = await axios(config);
        const data = response.data;
        if (env.LOG === "TRUE") {
            console.log({
                request: {
                    send: config,
                    result: data,
                },
            });
            await db.post({
                data: {
                    request: {
                        send: config,
                        result: data,
                    },
                },
                table: "logs",
            });
        }
        return {
            type: "ok",
            ...data,
        };
    } catch (error) {
        if (env.LOG === "TRUE") {
            console.log(error);
            await db.post({
                data: error,
                table: "logs",
            });
        }
        return {
            type: "error",
            msj: `${error}`,
            error,
        };
    }
};
