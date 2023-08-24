const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const multer = require('multer');
const profilesController = require('./controllers/api/profiles');


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
// app.post("/api/profiles/create", upload.single("picture"), profilesController.create);
app.post('/api/upload', upload.single('profilePicture'), (req, res) => {
  // console.log(req.file)
  if (req.file) {
    // The uploaded file information is available in req.file
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

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
const port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log(`Express app running on port ${port}`)
});
