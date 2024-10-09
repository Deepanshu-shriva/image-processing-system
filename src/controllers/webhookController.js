const Product = require("../models/Product");
const axios = require("axios");

async function handleWebhook(req, res) {
const { requestId, status } = req.body;

try {

if (!requestId || !status) {
return res.status(400).json({ message: "Invalid request data" });
}


const result = await Product.updateOne({ request_id: requestId }, { status });
if (result.nModified === 0) {
return res.status(404).json({ message: "Request ID not found" });
}

res.status(200).json({ message: "Webhook received successfully" });

await notifyWebhook(requestId, status);
} catch (error) {
console.error("Error processing webhook:", error.message);
res.status(500).json({ message: "Error processing webhook", error: error.message });
}
}

async function notifyWebhook(requestId, status) {
try {
await axios.post('http://localhost:3000/api/webhook', { requestId, status });
} catch (error) {
console.error("Error sending webhook:", error.message);
}
}

module.exports = { handleWebhook };
