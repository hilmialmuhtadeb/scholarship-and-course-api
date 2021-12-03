const express = require('express');
const scholarshipRoutes = require('./src/routes/scholarship');
const mongoose = require('mongoose');

const port = 4000;
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/v1', scholarshipRoutes);

app.use((error, req, res, next) => {
  res.status(error.status).json({
    message: error.message,
    data: error.data,
  });
});

mongoose.connect('mongodb+srv://hilmialmuhtadeb:scholarshipandcourse@cluster0.vi3ry.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
  .then(() => {
    app.listen(port, () => {
      console.log(`Your app is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log('error');
  });