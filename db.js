const mongoose = require('mongoose');
require('dotenv').config();
// const mongoURL = 'mongodb://localhost:27017/hotels';
const mongoURL = process.env.DB_URL;

mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on('connected', () => {
  console.log('Connected to MongoDB');
});
db.on('error', (err) => {
  console.log('Mongodb connection error', err);
});
db.on('disconnected', (err) => {
  console.log('Mongodb disconnected', err);
});

module.exports = db;
