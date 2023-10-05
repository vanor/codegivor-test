import mongoose from "mongoose";
import Book from "../models/Book.js";
import ValidationError from "../validation/ValidationError.js";

export const getBooks = async (req, res, next) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);

    } catch (error) {
        next(error);
    }
};

export const createBook = async (req, res, next) => {
    let { title, author, publishedDate } = req.body;

    try {
        _checkData(req.body, res);
        const newBook = new Book({ title, author, publishedDate });

        await newBook.save();
        res.status(201).json(newBook);

    } catch (error) {
        next(error);
    }
};

export const updateBook = async (req, res, next) => {
    let { id: _id } = req.params;
    let { title, author, publishedDate } = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(_id))
            throw new ValidationError('There is no book with this id', 404);
        
        _checkData(req.body, res);
        const updatedBook = await Book.findByIdAndUpdate(_id, { title, author, publishedDate, _id }, { new: true });
        res.status(200).json(updatedBook);

    } catch (error) {
        next(error);
    }
};

export const deleteBook = async (req, res) => {
    let { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id))
            throw new ValidationError('There is no book with this id', 404);

        await Book.findByIdAndRemove(id);
        res.status(200).json({ message: 'book deleted sucessfully' });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const _checkData = (book, res) => {
    if (!book || !book.title || !book.author || !book.publishedDate)
        throw new ValidationError('title, author or published date are missing', 400);

    let datePattern = /(\d{4})\-(\d{2})\-(\d{2})/;
    if (!book.publishedDate.match(datePattern))
        throw new ValidationError('published date format is not good', 400);
};
