const express = require('express');
const scholarshipRoutes = require('./src/routes/scholarship');

const app = express();

app.use('/v1', scholarshipRoutes);

app.listen(4000);