import express from "express";
import routes from "../routes";
import {
    getUpload,
    postUpload,
    bookDetail,
    getEditBook,
    postEditBook,
    deleteBook
  } from "../controllers/bookController";
  import { uploadBook } from "../middlewares";

const bookRouter = express.Router();

// Upload
bookRouter.get(routes.upload, getUpload);
bookRouter.post(routes.upload, uploadBook, postUpload);

// Book Detail
bookRouter.get(routes.bookDetail(), bookDetail);

// Edit Book
bookRouter.get(routes.editBook(), getEditBook);
bookRouter.post(routes.editBook(), postEditBook);

// Delete Book
bookRouter.get(routes.deleteBook(), deleteBook);

export default bookRouter;