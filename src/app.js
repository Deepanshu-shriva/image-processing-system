const express = require("express");
const mongoose = require("mongoose");
const apiRoutes = require("./routes/api");
require("dotenv").config();
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api", apiRoutes);


mongoose
    .connect(process.env.MONGODB_URI, {})
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

module.exports = app;
