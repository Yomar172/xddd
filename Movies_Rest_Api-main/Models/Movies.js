var mongoose = require('mongoose')
var Schema = mongoose.Schema


var MovieSchema = new Schema({
    MovieName: {
        type: String
    },
    Genre: {
        type: String
    },
    Launguage: {
        type: String
    },
    ReleasedDate: {
        type: Date
    }

}, {
    timestamps: true
});

var Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie