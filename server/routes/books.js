import express from "express";

import auth from "../middlewares/auth.js";
import { getBooks, createBook, updateBook, deleteBook } from "../controllers/books.js";

const router = express.Router();

router.get('/', auth, getBooks);
router.post('/', auth, createBook);
router.put('/:id', auth, updateBook);
router.delete('/:id', auth, deleteBook);

export default router;