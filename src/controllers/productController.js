const Product = require("../models/Product");
const { processImages } = require("../services/imageProcessingService");
const { validateCSV } = require("../services/csvValidator");
const { generateOutputCSV } = require("../services/csvGenerator");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const upload = multer({ dest: "uploads/" });
async function uploadCSV(req, res) {
const requestId = uuidv4();

try {
if (!req.file) {
return res.status(400).json({ error: "No file uploaded" });
}
const validatedData = await validateCSV(req.file.path);
const products = validatedData.map(
(data) =>
new Product({
serial_number: data["S. No."],
product_name: data["Product Name"],
input_image_urls: data["Input Image Urls"]
.split(",")
.map((url) => url.trim()),
request_id: requestId,
})
);
await Product.insertMany(products);
await Promise.all(products.map(processImages));
await generateOutputCSV(requestId);
res.status(201).json({ request_id: requestId });
} catch (error) {
console.error("Error in uploadCSV:", error);
res.status(500).json({ error: error.message });
}
}

async function checkStatus(req, res) {
const { request_id } = req.params;
const products = await Product.find({ request_id });

if (products.length === 0) {
return res.status(404).json({ error: "Request ID not found" });
}
res.json(products);
}
module.exports = { uploadCSV, checkStatus, upload };
