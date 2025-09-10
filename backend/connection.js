const mongoose = require('mongoose');

const url = process.env.DATABASE_URL;


//asynchronous function
mongoose.connect(url)
    .then((result) => {
        console.log('connected to db');
    }).catch((err) => {
        console.log(err);
    });

module.exports = mongoose;