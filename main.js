const express = require('express');
const movieRouter = require('./routers/movieRouter');
const memberRouter = require('./routers/memberRouter');
const userRouter = require('./routers/userRouter');
const dotenv = require('dotenv');
const mongoose = require('mongoose');






var cors = require('cors');

const cookieParser = require('cookie-parser');


const app = express();
app.use(cors());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({extended: true}));


// require('./configs/database');
dotenv.config();
mongoose.connect(
    process.env.MDB_CONNECT,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => 
    {
        if(err) return console.log(err);
        console.log("Connected to MongoDB");
    }
)

app.use('/api/movies', movieRouter);
app.use('/api/member', memberRouter);
app.use('/api/user', userRouter);

//If we on production level 'Step 3'
if(process.env.NODE_ENV === 'production')
{
    app.use(express.static('client/build'))
}


const PORT = process.env.PORT || 8000;
app.listen(PORT);
