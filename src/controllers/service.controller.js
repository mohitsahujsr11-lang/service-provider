const db = require("../models");

exports.getServiceSections = async (req, res) => {
    try {
        // Find all distinct categories like (Driver, Plumber, Electrician)
        const services = await db.Service.findAll();
        res.json(services);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addServiceSection = async (req, res) => {
    try {
        // Add a new distinct category
        const service = await db.Service.create(req.body);
        res.json(service);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProvidersBySection = async (req, res) => {
    try {
        const { serviceId } = req.params;
        // Find every vendor working under this explicit sections (e.g. all Drivers)
        const providers = await db.Provider.findAll({
            where: { ServiceId: serviceId },
            include: [db.Service]
        });
        res.json(providers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};