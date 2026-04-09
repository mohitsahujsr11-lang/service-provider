module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Address", {
        street: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        zip_code: DataTypes.STRING,
        country: DataTypes.STRING
    });
};
