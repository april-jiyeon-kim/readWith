// Global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

// Users

const USERS = "/users";
const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";
const ME = "/me";

// Books

const BOOKS = "/books";
const UPLOAD = "/upload";
const BOOK_DETAIL = "/:id";
const EDIT_BOOK = "/:id/edit";
const DELETE_BOOK = "/:id/delete";

// Github

const GITHUB = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  userDetail: id=>{
      if(id) {
          return `/users/${id}`;
      }else{
          return USER_DETAIL;
      }
  },
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  books: BOOKS,
  upload: UPLOAD,
  bookDetail: id => {
    if(id) {
        return `/books/${id}`;
    }else{
        return BOOK_DETAIL;
    }
  },
  editBook: id => {
    if (id) {
      return `/books/${id}/edit`;
    } else {
      return EDIT_BOOK;
    }
  },
  deleteBook: id => {
    if (id) {
      return `/books/${id}/delete`;
    } else {
      return DELETE_BOOK;
    }
  },
  gitHub: GITHUB,
  githubCallback: GITHUB_CALLBACK,
  me: ME
};

export default routes;