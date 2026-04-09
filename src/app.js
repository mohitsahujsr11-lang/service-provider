require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });
const express = require("express");
const app = express();
const db = require("./models");

app.use(express.json());

// Serve static files from the uploads directory
const path = require("path");
app.use("/upload", express.static(path.join(__dirname, "../uploads")));

app.use("/auth", require("./routes/auth.routes"));
app.use("/services", require("./routes/service.routes"));
app.use("/booking", require("./routes/booking.routes"));

db.sequelize.sync({ alter: true }).then(() => {
    app.listen(process.env.PORT, () =>
        console.log("Server running on port " + process.env.PORT)
    );
});