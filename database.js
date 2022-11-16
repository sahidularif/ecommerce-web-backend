// MongoDB Configuration
require('dotenv').config();
const mongoose = require('mongoose');
// const DB = 'mongodb://localhost:27017/mydb'
// const DB = 'mongodb://localhost:27017/mydb'

const DB = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.or4h7.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

module.exports = () => {
    mongoose.connect(DB, {
        useNewUrlParser: true,
        // useCreateIndex: true,
        useUnifiedTopology: true,
        // useFindAndModify: false
    })
    .then(() => console.log('Connected to Mongodb database'))
    .catch(error => console.log('Database could not be connected'))
}

