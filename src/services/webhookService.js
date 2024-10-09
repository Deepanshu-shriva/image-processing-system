const axios = require("axios");

async function triggerWebhook(webhookUrl, products) {
  if (webhookUrl) {
    try {
      const payload = {
        status: "completed",
        products: products.map(product => ({
          serial_number: product.serial_number,
          product_name: product.product_name,
          input_image_urls: product.input_image_urls,
          output_image_urls: product.output_image_urls,
        })),
      };
      await axios.post(webhookUrl, payload);
      console.log("Webhook triggered successfully.");
    } catch (error) {
      console.error("Error triggering webhook:", error);
    }
  }
}

module.exports = { triggerWebhook };
