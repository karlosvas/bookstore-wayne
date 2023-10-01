import mongoose from 'mongoose';

const Schema = mongoose.Schema
const bookSchema = new Schema({
    id: String,
    title: String,
    content: String,
    imagePath: String,
    price: String,
});

export const Book = mongoose.model('Books', bookSchema);


