const router = require("express").Router();
const ctrl = require("../controllers/provider.controller");
const auth = require("../middleware/auth.middleware");

router.get("/", ctrl.getAllProviders);
router.get("/:id", ctrl.getProviderById);

// Protected routes for vendors to manage their service types
router.post("/", auth, ctrl.addProvider);
router.put("/:id", auth, ctrl.updateProvider);
router.delete("/:id", auth, ctrl.deleteProvider);

module.exports = router;
