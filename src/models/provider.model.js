module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Provider", {
        name: DataTypes.STRING,
        // 'service' string is removed because it will be dynamically connected to Service model via 'ServiceId'
        price: DataTypes.INTEGER,
    });
};