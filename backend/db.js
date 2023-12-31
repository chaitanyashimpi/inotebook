const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/inotebook'

mongoose.set('strictQuery', false);

const connection = () => {
    mongoose.connect(mongoURI, () => {
        console.log('Connected to MongoDB');
    })
}

module.exports = connection