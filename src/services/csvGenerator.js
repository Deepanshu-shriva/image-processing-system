const { Parser } = require('json2csv');
const fs=require('fs').promises;
const path = require('path');
const Product = require('../models/Product');

async function generateOutputCSV(requestId) {
    const products = await Product.find({ request_id: requestId });

    if (!products || products.length === 0) {
        throw new Error("No products found for this request ID");
    }

    const outputData = products.map(product => ({
        'S. No.': product.serial_number,
        'Product Name': product.product_name,
        'Input Image Urls': product.input_image_urls.join(', '),
        'Output Image Urls': product.output_image_urls.join(', ')
    }));

    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(outputData);
    
    const outputFilePath = path.join('outputs', `output_${requestId}.csv`);
    await fs.writeFile(outputFilePath, csv);
    
    return outputFilePath;
}

module.exports = { generateOutputCSV };
