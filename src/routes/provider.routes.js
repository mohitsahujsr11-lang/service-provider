const router = require("express").Router();
const ctrl = require("../controllers/provider.controller");

router.get("/", ctrl.getAllProviders);
router.get("/:id", ctrl.getProviderById);
router.post("/", ctrl.addProvider);
router.put("/:id", ctrl.updateProvider);
router.delete("/:id", ctrl.deleteProvider);

module.exports = router;
