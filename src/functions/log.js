require("module-alias/register");
const env = require("@app/env");
const db = require("@app/db");

module.exports = async (type = "", data = {}) => {
    if (env.LOG === "TRUE") {
        await db.post({
            data: {
                type,
                ...data,
            },
            table: "logs",
        });
    }
};
