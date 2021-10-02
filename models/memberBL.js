const Member = require('./memberModel');
const Movie = require('./movieModel')

exports.getAllMembers = () =>
{
    return new Promise((resolve, reject) =>
    {
        Member.find().populate("moviesWatched.movieId").exec(function(err, data)
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

exports.getMemberById = (id) =>
{
    return new Promise((resolve, reject) =>
    {
        Member.findById(id).populate("moviesWatched.movieId").exec(function(err,data)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(data);
            }
        })
    })
}

exports.updateMember = function(id, obj)
{
    return new Promise((resolve, reject) =>
    {
        Member.findByIdAndUpdate(id, {
            fullName: obj.fullName,
             email: obj.email,
             city : obj.city,
             
            
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

exports.addMember = (obj) =>
{
    return new Promise((resolve, reject) =>
    {
        let member = new Member({
            fullName: obj.fullName, 
            email: obj.email,
            city : obj.city,
            
        });

        member.save(function(err)
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
 
exports.updateMovieAndDate = (id, obj) =>
{
    return new Promise((resolve, reject) =>
    {
        Member.findByIdAndUpdate(
            id,
            { 
     $addToSet : { "moviesWatched" : { movieId: obj._id,
                                    data : obj.data}}
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



exports.deleteMember = (id) =>
{
    return new Promise((resolve, reject) =>
    {
        Member.findByIdAndDelete(id, function(err)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve('Deleted!')
            }
        })
    })
}


//Pull movie from member by movie ID

exports.deleteOnlyMovie = (id, obj) =>
{
    return new Promise((resolve, reject) =>
    {
        let query = {_id: id}
        
        Member.findByIdAndUpdate(
            query,
            {$pull: {  moviesWatched : {movieId : obj._id}  }},
            function(err)
            {
                if(err)
                {
                    reject(err)
                }
                else{
                    resolve("All Movies Updated")
                }
            }

        )
    })
}