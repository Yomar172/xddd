var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var MovieRouter = require('./Routes/MovieRouter')

var url = 'mongodb://localhost:27017/Movies';


var connect = mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});


connect
    .then((db) => {
        console.log('Connected correctly to Mongo server');
    })
    .catch((err) => {
        return err;
    })

var app = new express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use('/movies', MovieRouter);

app.use(function (req, res, next) {
    next()

});

// error handler
app.use(function (err, req, res, next) {

    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};


    res.status(err.status || 500);
    res.render('error');
});

var port = 2000;
app.listen(port, () => {
    console.log('listening on port ' + port);
});

module.exports = app;