
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MemberSchema = new Schema({
   fullName : String,
   email : String,
   city : String,
  
   moviesWatched : [
       {
          
            data: Date,
            movieId: [{
               type: Schema.Types.ObjectId,
            ref: 'movies'
            }]
         }
   ]
   

})




module.exports = mongoose.model('members', MemberSchema );