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
  import { uploadBook, onlyPrivate } from "../middlewares";

const bookRouter = express.Router();

// Upload
bookRouter.get(routes.upload, onlyPrivate, getUpload);
bookRouter.post(routes.upload, onlyPrivate, uploadBook, postUpload);

// Book Detail
bookRouter.get(routes.bookDetail(), bookDetail);

// Edit Book
bookRouter.get(routes.editBook(), onlyPrivate, getEditBook);
bookRouter.post(routes.editBook(), onlyPrivate, postEditBook);

// Delete Book
bookRouter.get(routes.deleteBook(), onlyPrivate, deleteBook);

export default bookRouter;