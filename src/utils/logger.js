// src/utils/logger.js
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next(); // Call next to continue to the next middleware
};

module.exports = logger; // 