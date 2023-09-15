const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const multer = require('multer');

require('dotenv').config()
require('./config/database')

const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

app.post('/api/upload', upload.single('profilePicture'), (req, res) => {
  if (req.file) {
    const filePath = path.join('assets', req.file.filename);
    console.log('File uploaded:', filePath);
    res.json({ filePath });
  } else {
    res.status(400).json({ message: 'File upload failed' });
  }
});

app.use(logger('dev'));
app.use(express.json());

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

app.use(require('./config/checkToken'))


// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'))
app.use('/api/profiles', require('./routes/api/profiles'))
app.use('/api/posts', require('./routes/api/posts'))
app.use('/api/messages', require('./routes/api/messages'))

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log(`Express app running on port ${port}`)
});
