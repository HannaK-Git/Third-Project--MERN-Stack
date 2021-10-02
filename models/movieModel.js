const mongoose = require('mongoose');

let MovieSchema = new mongoose.Schema({
    
    name: String,
    yearPremiered: Number,
    genres: [String],
    image: String, 
    membersThatWatched : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'members'
        }
    ]
})



module.exports = mongoose.model('movies', MovieSchema );