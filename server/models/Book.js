import mongoose from "mongoose";

const schema = mongoose.Schema({
    title: String,
    author: String,
    publishedDate: Date
});

const Book = mongoose.model('Book', schema);

export default Book;
