const mongoose = require('mongoose');
require('dotenv').config();
const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${
  process.env.DB_HOST
}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const usersDBConnection = mongoose.createConnection(uri);
module.exports = usersDBConnection;
