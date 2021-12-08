require("module-alias/register");
const env = require("@app/env");
const db = require("@app/db");

module.exports = async ({ type = "", data = {} }) => {
    if (env.LOG === "TRUE") {
        console.log({
            type,
            ...data
        });
        await db.post({
            data: {
                type,
                date:(new Date()),
                ...data,
            },
            table: "logs",
        });
    }
};
