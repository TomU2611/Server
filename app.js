const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');
const mongoose = require('mongoose');


const customEnv = require('custom-env');
customEnv.env(process.env.NODE_ENV, './config');

mongoose.connect(process.env.CONNECTION_STRING,
     {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }
);

var app = express();

const videos = require('./routes/videos');
app.use('/videos', videos);

app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.json());

app.listen(process.env.PORT);