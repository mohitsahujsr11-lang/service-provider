const router = require("express").Router();
const ctrl = require("../controllers/address.controller");
const auth = require("../middleware/auth.middleware");

// All address routes are protected
router.use(auth);

router.get("/", ctrl.getUserAddresses);
router.post("/", ctrl.addAddress);
router.put("/:id", ctrl.updateAddress);
router.delete("/:id", ctrl.deleteAddress);

module.exports = router;
