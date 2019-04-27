require('dotenv/config');

const mongoose = require('mongoose');
const TendersSchema = require('../models/tenders');

mongoose.connect(`${process.env.MONGO_CONNECTION_URI}/${process.env.DB_NAME}`, {
  useNewUrlParser: true
});

mongoose.connection.on('error', error => {
  console.log('Database connection error:', error);
  databaseConnection = 'Error connecting to Database';
});

mongoose.connection.once('open', () => {
  console.log('Connected to Database!');
  databaseConnection = 'Connected to Database';
});

const tendersModel = new mongoose.model('Tenders', TendersSchema);

module.exports = tendersModel;
