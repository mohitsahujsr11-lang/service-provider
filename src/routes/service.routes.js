const router = require("express").Router();
const ctrl = require("../controllers/service.controller");
const upload = require("../middleware/upload.middleware");

router.get("/sections", ctrl.getServiceSections);
router.get("/sections/:serviceId", ctrl.getServiceById);
router.post("/sections", upload.single("image"), ctrl.addServiceSection);
router.get("/sections/:serviceId/providers", ctrl.getProvidersBySection);
router.put("/sections/:serviceId", upload.single("image"), ctrl.updateServiceSection);
router.delete("/sections/:serviceId", ctrl.deleteServiceSection);

module.exports = router;