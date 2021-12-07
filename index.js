const express = require('express');
const scholarshipRoutes = require('./src/routes/scholarship');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const port = 4000;
const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    callback(null, `${new Date().getTime()}-${file.originalname}`);
  }
})

const fileFilter = (req, file, callback) => {
  const mimeTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp', 'image/svg+xml'];
  if (mimeTypes.indexOf(file.mimetype)) {
    callback(null, true);
  } else {
    callback(null, false);
  }
}

app.use(express.json());
app.use('/v1/images', express.static(path.resolve(__dirname, 'images')));

app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('poster'));

app.use(cors());

app.use('/v1', scholarshipRoutes);

app.use((error, req, res, next) => {
  res.status(error.status).json({
    message: error.message,
    data: error.data,
  });
});


mongoose.connect('mongodb+srv://hilmialmuhtadeb:scholarshipandcourse@cluster0.vi3ry.mongodb.net/scholarship?retryWrites=true&w=majority', { useNewUrlParser: true,useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`Your app is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log('error');
  });