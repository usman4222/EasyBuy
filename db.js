import mongoose from "mongoose"

export const dataBase = () => {

    mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/easy-buy")
        .then(() => {
            console.log('MongoDB is connected');
        })
        .catch((error) => {
            console.log('Error while connecting to the database', error);
        });

}

