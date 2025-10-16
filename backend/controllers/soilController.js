const path = require('path');

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    // build public URL (app serves /uploads statically)
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    // TODO: add processing (analysis) here and return analysis results
    return res.json({ message: 'Upload successful', fileUrl });
  } catch (err) {
    console.error('uploadImage error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};
