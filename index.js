const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const scholarshipRoutes = require('./src/routes/scholarshipRoutes');
const authRoutes = require('./src/routes/authRoutes');

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

const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png/;
  const mimetype = fileTypes.test(file.mimetype);
  if (mimetype) {
    return cb(null, true);
  }
  cb("Error: File yang anda kirim tidak valid");
}

app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000']
}));
app.use(express.json());

app.use(multer({
  storage: fileStorage, 
  fileFilter: fileFilter
}).single('poster'));

app.use('/v1/images', express.static(path.resolve(__dirname, 'images')));
app.use('/v1/scholarships', scholarshipRoutes);
app.use('/v1/auth', authRoutes);


app.use((error, req, res, next) => {
  res.status(error.status).json({
    message: error.message,
    data: error.data,
  });
});

mongoose.connect('mongodb+srv://hilmialmuhtadeb:scholarshipandcourse@cluster0.vi3ry.mongodb.net/scholarship?retryWrites=true&w=majority', { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
  .then(() => {
    app.listen(port, () => {
      console.log(`Your app is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log('error');
  });