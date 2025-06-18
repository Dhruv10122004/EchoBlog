require('dotenv').config();
const express = require('express');
const app = express();
const port = 8000;
const client = require('./db/connection.js');
const multer = require('multer');
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}.${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

app.get('/', (req, res) => {
  res.json('Hello World!');
});

// Route: Get all blogs
app.get('/blog', async (req, res) => {
  try {
    const result = await client.query('SELECT * from blogs');
    res.json({ data: result.rows });
  } catch (err) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// Route: Get blogs by category
app.get('/blog/category/:cat', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM blogs WHERE category = $1', [req.params.cat]);
    res.json({ data: result.rows });
  } catch (err) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// Route: Get blog by ID
app.get('/blog/:id', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM blogs WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json({ data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// Route: Create a new blog
app.post('/blog', async (req, res) => {
  try {
    const { title, image, post, category } = req.body;
    await client.query(
      'INSERT INTO blogs (title, image, post, category) VALUES ($1, $2, $3, $4)',
      [title, image, post, category]
    );
    res.json({ message: 'Blog created successfully', data: req.body });
  } catch (err) {
    res.status(500).json({ error: 'Insert failed', details: err.message });
  }
});

// Route: Upload image file
app.post('/blogimage', upload.single('file'), (req, res) => {
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({
    filename: req.file.filename,
    url: fileUrl,
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
