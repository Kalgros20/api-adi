var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var cors = require('cors');
module.exports = function (app) {
    var app = express();

    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(expressValidator());

    consign()
        // .include('handler')
        // .then('infra')
        // .then('service')
        .into(app);
    return app;
}