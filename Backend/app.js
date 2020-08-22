/* 
    this file will have all the application level configuration,
    as we go ahead we will keep on adding middlewares 
    and supporting libraries
*/

const express = require('express'); // import express
const app = express(); // initialise app with express

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Logger
app.use(logger('dev'));

// body parsers
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));

// CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// import our routes
const routes = require('./Routes/PostsRoutes');
// middleware to use our routes
app.use('/', routes);

// export the app
module.exports = app;
