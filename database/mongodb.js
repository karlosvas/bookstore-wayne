import dotenv from 'dotenv';
import mongoose, { Schema, model } from "mongoose";

dotenv.config();
const connectString = `mongodb+srv://karlosvas:${process.env.PASSWORD}@clusterw.koiqqr0.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(connectString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Database conected")
    }).catch(err => {
        console.error(`El error es ${err}`)
    })

const noteSchema = new Schema({
    id: String,
    title: String,
    content: String,
    imagePath: String,
    price: Number
})

const Note = model('Note', noteSchema)

// Para ver los datos creados
Note.find({}).then(result => {
    console.log(result)
    mongoose.connection.close()
})



