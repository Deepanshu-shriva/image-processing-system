const express = require("express");
const { upload } = require("../controllers/productController");
const router = express.Router();
const { uploadCSV, checkStatus } = require("../controllers/productController");
const { handleWebhook } = require("../controllers/webhookController"); 
router.post("/upload", upload.single("file"), uploadCSV);
router.post("/webhook", handleWebhook); 
router.get("/status/:request_id", checkStatus);

module.exports = router;
