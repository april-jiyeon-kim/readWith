import routes from "../routes";
import Book from "../models/Book";
import User from "../models/User";
// Home

export const home = async (req, res) => {
  try {
    const books = await Book.find({}).sort({ _id: -1 });
    console.log(books);
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
  console.log(req);
  const {
    body: { title, description, author, published_date },
    file: { path }
  } = req;
  const newBook = await Book.create({
    thumbnail: path,
    title,
    description,
    author,
    published_date,
    updater: req.user._id
  });
  req.user.books.push(newBook.id);
  await User.findByIdAndUpdate(req.user._id, {
    books: req.user.books
  });
  res.redirect(routes.bookDetail(newBook.id));
};

// Book Detail

export const bookDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const book =  await Book.findById(id).populate("updater");
    console.log(book);
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
  console.log(req.user._id);
  
  try {
    const book = await Book.findById(id);
    if (book.updater != req.user._id) {
      throw Error();
    } else {
      res.render("editBook", { pageTitle: `Book ${book.title}`, book });
    }
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
    const book = await Book.findById(id);
    if (book.creator !== req.user.id) {
      throw Error();
    } else {
      await Book.findOneAndRemove({ _id: id });
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};