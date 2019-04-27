const mongoose = require('mongoose');
const { Schema } = mongoose;

const TendersSchema = new Schema({
  id: { type: String, required: true, index: true },
  date: String
});

module.exports = TendersSchema;
