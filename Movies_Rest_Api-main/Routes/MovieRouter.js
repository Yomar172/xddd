var express = require('express');
var router = express.Router();
var Movie = require('../Models/Movies')


router.use(express.json())



/* GET List of Movies. */
router.get('/', (req, res, next) => {
    Movie.find({})
        .then((result) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ MovieList: result })
        }).catch((err) => {
            return next(err)
        })
});

/*Posting a Movie*/
router.post('/', (req, res, next) => {
    Movie.create({
        MovieName: req.body.MovieName,
        Genre: req.body.Genre,
        Launguage: req.body.Launguage,
        ReleasedDate: req.body.ReleasedDate
    }).then((result) => {
        res.statusCode = 200;
        res.setHeader('ContentType', 'application/json')
        res.json({ Created: true, Movie: result })
    }).catch((err) => {
        return next(err)
    })
})


/* Get a Particular Movie , Delete a Movie, Update a Movie the Id here is the ObjectId which will be generated by mongodb while creating*/


router.route('/:movieId')
    .get((req, res, next) => {
        Movie.findById(req.params.movieId)
            .then((result) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({ Movie: result })

            })
            .catch((err) => {
                return next(err)
            })
    })
    .put((req, res, next) => {
        Movie.findByIdAndUpdate(req.params.movieId, {
            $set: req.body
        }).then((result) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ Updated: true, Movie: result });
        }, (err) => next(err))
            .catch((err) => {
                return next(err)
            });
    })
    .delete((req, res, next) => {

        Movie.findByIdAndRemove(req.params.movieId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({ deleted: true, DeletedMovie: resp });
            }, (err) => next(err))
            .catch((err) => {
                return next(err)
            });
    })

module.exports = router;