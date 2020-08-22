/*
    this file will have all the server configuration,
    DB Connection, port settings etc
*/

const mongoose = require('mongoose');

require('dotenv').config({ path: '.env' });

// Database connection
mongoose.connect(process.env.DATABASE,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }
);

mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`Database Connection Error → ${err.message}`);
});

// require our models here so that it can be accessed throughtout the application
require('./Models/Posts');

// require app.js
const app = require('./app');

// start the server on port 3000
const server = app.listen(3000, () => {
  console.log(`Express running → PORT ${server.address().port}`);
})