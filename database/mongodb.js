import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config();

export function connectionDB() {
    const connectString = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@clusterw.koiqqr0.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`

    mongoose.connect(connectString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
            console.log("Database conected")
        }).catch(err => {
            console.error(`El error es ${err}`)
        })

}



