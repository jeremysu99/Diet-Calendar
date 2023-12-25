const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const config = require('./config');
const usersRouter = require('./routes/users');
const foodRouter = require('./routes/food');
const dateRouter = require('./routes/date');
const app = express();
const cors = require('cors');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use('/users', usersRouter);
app.use('/foodRoute', foodRouter);
app.use('/dateRoute', dateRouter);
app.use('/api', usersRouter);

dotenv.config();

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true }).then(() => {
  console.log('Connected to MongoDB database');
});

app.listen(config.PORT, () => {
  console.log('Server started on Port ' + config.PORT);
});

module.exports = app;
