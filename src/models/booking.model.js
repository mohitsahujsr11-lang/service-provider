module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Booking", {
        status: {
            type: DataTypes.STRING,
            defaultValue: "pending",
        },
    });
};