var express = require('express');

var requestDispatcher = module.exports = function(app) {
    var route = express.Router();

    route.use('/masterpiece', require('./masterpiece'));

    // catch 404 and forward to error handler
    route.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    app.use(route);
};
