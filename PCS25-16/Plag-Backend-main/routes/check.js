const express = require('express');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'application/csv') {
      return cb(new Error('Only CSV files are allowed.'));
    }
    cb(null, true);
  },
});

router.post('/  ', upload.single('pdf'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  const filePath = path.join(__dirname, '../uploads', req.file.filename);
  const form = new FormData();
  form.append('csv', fs.createReadStream(filePath));

  try {
    const response = await axios.post('http://localhost:8000/check', form, {
      headers: form.getHeaders(),
    });

    fs.unlink(filePath, () => {}); // Cleanup uploaded file

    return res.json(response.data); // Pass response back to frontend
  } catch (err) {
    console.error('Model call failed:', err.message);
    return res.status(500).json({ error: 'Model API error.' });
  }
});

module.exports = router;
