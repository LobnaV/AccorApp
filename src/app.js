// const express = require('express');
//
// const app = express();
//
// app.use('/', express.static('./app'));
//
// module.exports = app;
// Use Express
const express = require("express");
// Use body-parser
const bodyParser = require("body-parser");

// Create new instance of the express server
const app = express();

// Define the JSON parser as a default way
// to consume and produce data through the
// exposed APIs
app.use(bodyParser.json());

// Create link to Angular build directory
// The `ng build` command will save the result
// under the `dist` folder.
// const distDir = __dirname + "/app/";
app.use(express.static("D:/viggo/AccorApp/frontend/dist/app/"));

module.exports = app;
