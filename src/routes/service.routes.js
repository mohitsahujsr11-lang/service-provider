const router = require("express").Router();
const ctrl = require("../controllers/service.controller");

router.get("/sections", ctrl.getServiceSections);
router.post("/sections", ctrl.addServiceSection);
router.get("/sections/:serviceId/providers", ctrl.getProvidersBySection);

module.exports = router;