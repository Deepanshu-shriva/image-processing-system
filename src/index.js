require("dotenv").config();
const app = require("./app");
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, (err) => {
    if (err) {
        console.error("Failed to start server:", err);
        process.exit(1);
    }
    const ENV = process.env.NODE_ENV || "development";
    console.log(`Server is running in ${ENV} mode on http://localhost:${PORT}`);
});


process.on("SIGINT", () => {
    server.close(() => {
        console.log("Server closed");
        process.exit(0);
    });
});
