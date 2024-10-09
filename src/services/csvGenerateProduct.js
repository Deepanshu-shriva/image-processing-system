const fs = require("fs");

const products = [
  {
    serialNumber: 1,
    productName: "SKU1",
    inputImageUrls: [
      "https://www.public-image-url1.jpg",
      "https://www.public-image-url2.jpg",
      "https://www.public-image-url3.jpg",
    ],
  },
  {
    serialNumber: 2,
    productName: "SKU2",
    inputImageUrls: [
      "https://www.public-image-url1.jpg",
      "https://www.public-image-url2.jpg",
      "https://www.public-image-url3.jpg",
    ],
  },
];

// Generate CSV content
let csvContent = "S. No.,Product Name,Input Image Urls\n";
products.forEach((product) => {
  const urls = product.inputImageUrls.join(","); // Join URLs with commas
  csvContent += `${product.serialNumber},${product.productName},${urls}\n`;
});

// Write to CSV file
fs.writeFileSync("product.csv", csvContent);
console.log("CSV file has been generated: product.csv");
