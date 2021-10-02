const Movie = require('../models/movieModel');
const Member = require('../models/memberModel')

exports.getAllMovies = function()
{
    return new Promise ((resolve, reject) =>
    {
        Movie.find().populate("membersThatWatched").exec(function(err, data)
        {
            if(err)
            {
                reject(err);
            }
            else{
                resolve(data);
            }
        })
    })
}

exports.getMovieById = (id) =>
{
    return new Promise((resolve, reject) => 
    {
        Movie.findById(id).populate("membersThatWatched").exec(function(err, data)
        {
           if(err)
           {
               reject(err);
           }
           else
           {
               resolve(data)
           }
        })
    })
}


exports.addMovie = function(obj)
{
    return new Promise((resolve, reject) =>
    {
        let movie = new Movie({
            name: obj.name,
            yearPremiered: obj.yearPremiered,
            genres: obj.genres,
            image: obj.image 
        })

        movie.save(function(err)
        {
            if(err)
            {
                reject(err);
            }
            else{
                resolve('Created');
            }
        })
    })
}


exports.updateMovie = function(id, obj)
{
    return new Promise((resolve, reject) =>
    {
        Movie.findByIdAndUpdate(id, {
            name: obj.name,
             yearPremiered: obj.yearPremiered,
             genres: obj.genres,
             image: obj.image,
            
        }, function(err)
        {
            if(err)
            {
                reject(err);
            }
            else{
                resolve('Updated!')
            }
        })
    })
}

exports.updateMemberThatWatched = (id, obj) =>
{
    return new Promise((resolve, reject) =>
    {
        Movie.findByIdAndUpdate(id,
            {  $push : { membersThatWatched : obj._id   }
        }, {upsert: true, new : true},
            function(err)
            {
                if(err)
                {
                    reject(err)
                }
                else
                {
                    resolve('Updated')
                }
            })

            
    })
}


exports.deleteMovie = (id) =>
{
    return new Promise((resolve, reject) =>
    {
         Movie.findByIdAndDelete(id, function(err)
        {
          
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve('Deleted');
            }
        })
       
    })
}

exports.deleteOnlyMember = (id, obj) =>
{
    return new Promise((resolve, reject) =>
    {
        
        let query = {_id: id}
        
        Movie.findByIdAndUpdate(
            query,
            {$pull: {  membersThatWatched : obj._id   }},
            function(err)
            {
                if(err)
                {
                    reject(err)
                }
                else{
                    resolve("All Members Updated")
                }
            }

        )
    })
}
