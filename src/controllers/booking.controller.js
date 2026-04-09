const db = require("../models");

exports.bookService = async (req, res) => {
    try {
        const { providerId, date, description } = req.body;
        const booking = await db.Booking.create({
            UserId: req.user.id,
            ProviderId: providerId,
            status: "pending"
        });
        res.json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Section 1: Consumer sees their own orders
exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await db.Booking.findAll({
            where: { UserId: req.user.id },
            include: [db.Provider]
        });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Section 2: Vendor views orders directed to them
exports.getProviderBookings = async (req, res) => {
    try {
        const { providerId } = req.params; 
        const bookings = await db.Booking.findAll({
            where: { ProviderId: providerId },
            include: [db.User] // Let the vendor see who ordered it
        });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Vendor executes Accept or Reject
exports.updateBookingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // send 'accepted' or 'rejected'

        const booking = await db.Booking.findByPk(id);
        if (!booking) return res.status(404).json({ msg: "Booking not found" });

        booking.status = status;
        await booking.save();

        res.json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};