module.exports = (sequelize, DataTypes) => {
    return sequelize.define("User", {
        name: DataTypes.STRING,
        email: { type: DataTypes.STRING, unique: true },
        password: DataTypes.STRING,
        role: { type: DataTypes.STRING, defaultValue: "user" },
        phone_no: DataTypes.STRING,
        profile_pic: DataTypes.STRING,
        dob: DataTypes.DATEONLY,
        experience: DataTypes.FLOAT, // Assuming years of experience
        document: DataTypes.STRING  // Path to uploaded doc
    });
};