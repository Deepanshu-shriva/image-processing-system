const sharp = require("sharp");
const axios = require("axios");
const fs = require("fs").promises;
const Product = require("../models/Product");
const { triggerWebhook } = require("./webhookService");
async function processImages(product) {
  const outputUrls = [];

  for (const url of product.input_image_urls) {
    console.log("Processing URL:", url);
   
    try {
      const response = await axios.get(url, { responseType: "arraybuffer" });

     
      const compressedImageBuffer = await sharp(response.data)
        .jpeg({ quality: 50 })
        .toBuffer();

     
      const outputFileName = `outputs/output_${product.serial_number}.jpg`;

     
      await fs.writeFile(outputFileName, compressedImageBuffer);

 
      outputUrls.push(outputFileName);
    } catch (error) {
      console.error("Error processing URL:", url, error.message); 
      outputUrls.push(null); 
    }
  }
  
  product.output_image_urls = outputUrls;
  product.status = "completed";
  await product.save();
  
   await triggerWebhook(product.webhook_url, [product]);
}

module.exports = { processImages };
