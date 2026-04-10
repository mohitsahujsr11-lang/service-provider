const db = require("../models");

exports.getUserAddresses = async (req, res) => {
    try {
        const addresses = await db.Address.findAll({
            where: { UserId: req.user.id }
        });
        res.json(addresses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addAddress = async (req, res) => {
    try {
        const { street, city, state, zip_code, country } = req.body;
        
        const missingFields = [];
        if (!street) missingFields.push("street");
        if (!city) missingFields.push("city");
        if (!state) missingFields.push("state");
        if (!zip_code) missingFields.push("zip_code");
        if (!country) missingFields.push("country");

        if (missingFields.length > 0) {
            return res.status(400).json({ 
                error: "Missing address fields", 
                missing: missingFields 
            });
        }

        const address = await db.Address.create({
            street,
            city,
            state,
            zip_code,
            country,
            UserId: req.user.id
        });
        
        res.status(201).json(address);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const address = await db.Address.findOne({
            where: { id, UserId: req.user.id }
        });
        
        if (!address) {
            return res.status(404).json({ error: "Address not found or unauthorized" });
        }

        await address.update(req.body);
        res.json(address);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const address = await db.Address.findOne({
            where: { id, UserId: req.user.id }
        });
        
        if (!address) {
            return res.status(404).json({ error: "Address not found or unauthorized" });
        }

        await address.destroy();
        res.json({ message: "Address deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
