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

exports.getServiceById = async (req, res) => {
    try {
        const { serviceId } = req.params;
        const service = await db.Service.findByPk(serviceId);
        if (!service) {
            return res.status(404).json({ error: "Service section not found" });
        }
        res.json(service);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addServiceSection = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: "Request body cannot be empty" });
        }
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: "Service 'name' is required" });
        }

        if (req.file) {
            req.body.image_url = `/uploads/${req.file.filename}`;
        }
        
        // Add a new distinct category
        const service = await db.Service.create(req.body);
        res.status(201).json(service);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ error: "Service with this name already exists" });
        }
        if (error.name === 'SequelizeValidationError') {
            const errors = error.errors.map(err => err.message);
            return res.status(400).json({ error: "Validation error", details: errors });
        }
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

exports.updateServiceSection = async (req, res) => {
    try {
        const { serviceId } = req.params;
        const service = await db.Service.findByPk(serviceId);
        
        if (!service) {
            return res.status(404).json({ error: "Service section not found" });
        }

        if (req.file) {
            req.body.image_url = `/uploads/${req.file.filename}`;
        }

        await service.update(req.body);
        res.json(service);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ error: "Service with this name already exists" });
        }
        res.status(500).json({ error: error.message });
    }
};

exports.deleteServiceSection = async (req, res) => {
    try {
        const { serviceId } = req.params;
        const service = await db.Service.findByPk(serviceId);
        
        if (!service) {
            return res.status(404).json({ error: "Service section not found" });
        }

        await service.destroy();
        res.json({ message: "Service section deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};