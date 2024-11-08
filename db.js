const mongoose = require('mongoose');

const dataBase = () => {

    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('MongoDB is connected');
        })
        .catch((error) => {
            console.log('Error while connecting to the database', error);
        });

}

module.exports = dataBase;
