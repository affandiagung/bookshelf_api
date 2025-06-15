const { getAllBooks, getBookById, addNewBook, updateBookById, deleteBookById } = require('./handler');

const routes = [
  {
    method : 'GET',
    path : '/books',
    handler: getAllBooks
  },
  {
    method : 'GET',
    path : '/books/{booksId}',
    handler: getBookById
  },
  {
    method : 'POST',
    path : '/books',
    handler: addNewBook
  },
  {
    method : 'PUT',
    path : '/books/{booksId}',
    handler: updateBookById
  },
  {
    method : 'DELETE',
    path : '/books/{booksId}',
    handler: deleteBookById
  }
];

module.exports = routes;