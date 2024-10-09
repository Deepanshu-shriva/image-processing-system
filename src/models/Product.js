const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
serial_number: { type: Number, required: true },
product_name: { type: String, required: true },
input_image_urls: [String], 
output_image_urls: [String], 
request_id: { type: String, required: true },
status: {
type: String,
enum: ["processing", "completed", "failed"],
default: "processing",
},
created_at: { type: Date, default: Date.now },
updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);
