require("module-alias/register");
const router = require("express").Router();
const webhook = require('@controllers/webhook/_index')


router.get("/deleteClient", webhook.deleteClient);
router.post("/deleteClient", webhook.deleteClient);
router.put("/deleteClient", webhook.deleteClient);
router.delete("/deleteClient", webhook.deleteClient);

router.get("/deleteShop", webhook.deleteShop);
router.post("/deleteShop", webhook.deleteShop);
router.put("/deleteShop", webhook.deleteShop);
router.delete("/deleteShop", webhook.deleteShop);


router.get("/getClient", webhook.getClient);
router.post("/getClient", webhook.getClient);
router.put("/getClient", webhook.getClient);
router.delete("/getClient", webhook.getClient);



module.exports = router;
