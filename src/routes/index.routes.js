require("module-alias/register");
const router = require("express").Router();

const respondOk = async (req, res) => {
    return res.send({
        type: "ok",
    });
};

router.get("/", respondOk);
router.post("/", respondOk);
router.put("/", respondOk);
router.delete("/", respondOk);

module.exports = router;
