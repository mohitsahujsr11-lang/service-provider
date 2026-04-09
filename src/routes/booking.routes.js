const router = require("express").Router();
const ctrl = require("../controllers/booking.controller");
const auth = require("../middleware/auth.middleware");

// Consumer placing an order
router.post("/", auth, ctrl.bookService);

// Consumer fetching their placed orders
router.get("/user", auth, ctrl.getUserBookings);

// Vendor fetching orders assigned to them
router.get("/provider/:providerId", auth, ctrl.getProviderBookings);

// Vendor accepting or rejecting an order
router.put("/:id/status", auth, ctrl.updateBookingStatus);

module.exports = router;