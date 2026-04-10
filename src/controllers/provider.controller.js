const db = require("../models");

exports.getAllProviders = async (req, res) => {
    try {
        const providers = await db.Provider.findAll({
            include: [db.Service, { model: db.User, attributes: ["name", "email", "profile_pic", "phone_no"] }]
        });
        res.json(providers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProviderById = async (req, res) => {
    try {
        const { id } = req.params;
        const provider = await db.Provider.findByPk(id, {
            include: [db.Service, { model: db.User, attributes: ["name", "email", "profile_pic", "phone_no"] }]
        });
        if (!provider) {
            return res.status(404).json({ error: "Provider not found" });
        }
        res.json(provider);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addProvider = async (req, res) => {
    try {
        const { name, price, ServiceId } = req.body;
        
        if (!name || !price || !ServiceId) {
            return res.status(400).json({ error: "name, price, and ServiceId are required" });
        }

        const provider = await db.Provider.create({
            name,
            price,
            ServiceId,
            UserId: req.user.id // Link to the authenticated vendor
        });
        
        res.status(201).json(provider);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateProvider = async (req, res) => {
    try {
        const { id } = req.params;
        const provider = await db.Provider.findByPk(id);
        
        if (!provider) {
            return res.status(404).json({ error: "Provider not found" });
        }

        await provider.update(req.body);
        res.json(provider);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteProvider = async (req, res) => {
    try {
        const { id } = req.params;
        const provider = await db.Provider.findByPk(id);
        
        if (!provider) {
            return res.status(404).json({ error: "Provider not found" });
        }

        await provider.destroy();
        res.json({ message: "Provider deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
