const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user.model")(sequelize, Sequelize);
db.Provider = require("./provider.model")(sequelize, Sequelize);
db.Booking = require("./booking.model")(sequelize, Sequelize);
db.Address = require("./address.model")(sequelize, Sequelize);
db.Service = require("./service.model")(sequelize, Sequelize); // new

// Relationships
db.User.hasMany(db.Booking);
db.Provider.hasMany(db.Booking);
db.Booking.belongsTo(db.User);
db.Booking.belongsTo(db.Provider);

// User-Address relationship
db.User.hasMany(db.Address);
db.Address.belongsTo(db.User);

// User-Provider relationship (Vendor offering one or more services)
db.User.hasMany(db.Provider);
db.Provider.belongsTo(db.User);

// Service-Provider relationship
db.Service.hasMany(db.Provider);
db.Provider.belongsTo(db.Service);

module.exports = db;