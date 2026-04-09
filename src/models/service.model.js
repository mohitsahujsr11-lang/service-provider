module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Service", {
        name: { 
            type: DataTypes.STRING, 
            unique: true, 
            allowNull: false // e.g. "driver", "electrician", "plumber", "tailor"
        },
        description: DataTypes.STRING,
        image_url: DataTypes.STRING
    });
};
