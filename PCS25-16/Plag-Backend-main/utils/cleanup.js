const fs = require('fs');
const path = require('path');

const UPLOADS_DIR = path.join(__dirname, '../uploads');

function cleanupOldFiles(ageInMinutes = 60) {
  fs.readdir(UPLOADS_DIR, (err, files) => {
    if (err) return console.error('Failed to read uploads directory', err);

    files.forEach(file => {
      const filePath = path.join(UPLOADS_DIR, file);
      fs.stat(filePath, (err, stats) => {
        if (err) return;

        const now = Date.now();
        const fileAge = (now - stats.mtimeMs) / (1000 * 60); // in minutes

        if (fileAge > ageInMinutes) {
          fs.unlink(filePath, err => {
            if (!err) console.log(`Deleted old file: ${file}`);
          });
        }
      });
    });
  });
}

module.exports = cleanupOldFiles;
