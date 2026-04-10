const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try {
        let { name, email, password, role, phone_no, dob, experience, addresses } = req.body;

        if (name) name = name.trim();
        if (email) email = email.trim();

        const existingUser = await db.User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ msg: "User with this email already exists" });
        }

        const hash = await bcrypt.hash(password, 10);

        let profile_pic = null;
        let document = null;
        
        const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get("host")}`;

        if (req.files) {
            if (req.files.profile_pic) {
                profile_pic = `${baseUrl}/upload/${req.files.profile_pic[0].filename}`;
            }
            if (req.files.document) {
                document = `${baseUrl}/upload/${req.files.document[0].filename}`;
            }
        }

        let parsedAddresses = [];
        if (addresses) {
            try {
                parsedAddresses = typeof addresses === 'string' ? JSON.parse(addresses) : addresses;
            } catch (e) {
                // If parsing fails, just leave it as empty array or fallback
            }
        }

        const user = await db.User.create({
            name,
            email,
            password: hash,
            role: role || "customer",
            phone_no,
            dob: dob || null,
            experience: experience ? parseFloat(experience) : null,
            profile_pic,
            document
        });

        if (parsedAddresses && parsedAddresses.length > 0) {
            // Include user.id as foreign key "UserId" (or dynamically based on Sequelize's default naming)
            const addressesWithUser = parsedAddresses.map(addr => ({
                ...addr,
                UserId: user.id
            }));
            await db.Address.bulkCreate(addressesWithUser);
        }

        // Optional: If role is vendor, you could also create a Provider entry here if your logic requires it.
        if (role === "vendor") {
            await db.Provider.create({
                name,
                UserId: user.id
            });
        }

        res.json(user);
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ msg: "Registration failed", error: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await db.User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ msg: "Invalid password" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    res.json({ token });
};