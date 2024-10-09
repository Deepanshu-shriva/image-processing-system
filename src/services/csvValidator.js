const fs = require('fs');
const csv = require('csv-parser');

async function validateCSV(filePath) {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
              
                if (results.length > 0 && results[0]["S. No."] && results[0]["Product Name"] && results[0]["Input Image Urls"]) {
                    resolve(results);
                } else {
                    reject(new Error("Invalid CSV format"));
                }
            })
            .on('error', (error) => reject(error));
    });
}

module.exports = { validateCSV };
