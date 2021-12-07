require("module-alias/register");
const axios = require("axios");
const db = require("@app/db");
const env = require("@app/env");

module.exports = async (config) => {
    try {
        const response = await axios(config);
        const data = response.data;
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
        return {
            type: "error",
            msj: `${error}`,
            error,
        };
    }
};
