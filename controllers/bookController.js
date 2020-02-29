import routes from "../routes";
import Book from "../models/Book";

// Home

export const home = async (req, res) => {
  try {
    const books = await Book.find({}).sort({ _id: -1 });
    res.render("home", { pageTitle: "Home", books });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", books: [] });
  }
};

// Search

export const search = async(req, res) => {
  const {
    query: { term: searchingBy }
  } = req;
  let books = [];
  try {
    books = await Book.find({
      title: { $regex: searchingBy, $options: "i" }
    });
  } catch (error) {
    console.log(error);
  }
  res.render("search", { pageTitle: "Search", searchingBy, books });
};

// Upload

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path }
  } = req;
  const newBook = await Book.create({
    coverUrl: path,
    title,
    description
  });
  res.redirect(routes.bookDetail(newBook.id));
};

// Book Detail

export const bookDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const book = await Book.findById(id);
    res.render("bookDetail", { pageTitle: book.title, book });
  } catch (error) {
    res.redirect(routes.home);
  }
};

// Edit Book

export const getEditBook = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const book = await Book.findById(id);
    res.render("editBook", { pageTitle: `Edit ${book.title}`, book });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditBook = async (req, res) => {
  const {
    params: { id },
    body: { title, description }
  } = req;
  console.log(id);
  try {
    await Book.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.bookDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

// Delete Book

export const deleteBook = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    await Book.findOneAndRemove({ _id: id });
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};