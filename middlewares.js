import multer from "multer";
import routes from "./routes";

const multerBook = multer({ dest: "uploads/books/" });

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "ReadWith";
  res.locals.routes = routes;
  res.locals.user = {
      isAuthenticated : true,
      id:1
  };
  next();
};

export const uploadBook = multerBook.single("bookCover");