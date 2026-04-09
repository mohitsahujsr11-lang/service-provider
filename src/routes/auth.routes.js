const router = require("express").Router();
const ctrl = require("../controllers/auth.controller");
const upload = require("../middleware/upload.middleware");

router.post("/register", upload.fields([
    { name: "profile_pic", maxCount: 1 },
    { name: "document", maxCount: 1 }
]), ctrl.register);
router.post("/login", ctrl.login);

module.exports = router;