

const { nanoid } = require('nanoid');
const booksData = require('./books');
const { addBookSchema, updateBookSchema } = require('./common/books.validation');

const getAllBooks = (request, h) => {
  const { name, reading, finished } = request.query;

  const books = booksData
    .filter((book) =>
      (reading === undefined || book.reading === (reading === '1')) &&
            (finished === undefined || book.finished === (finished === '1')) &&
            (name === undefined || book.name.toLowerCase().includes(name.toLowerCase()))
    )
    .map(({ id, name, publisher }) => ({ id, name, publisher }));

  return h.response({
    status: 'success',
    data: {
      books,
    },
  }).code(200);
};

const getBookById = (request, h) => {
  const { booksId } = request.params;
  const book = booksData.find((e) => e.id == booksId);
  if (!book)
    return h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan'
    }).code(404);

  return {
    status: 'success',
    data: { book }
  };



};

const addNewBook = (request, h) => {
  const validation = addBookSchema.validate(request.payload);
  if (validation.error) {
    return h.response({
      status: 'fail',
      message: validation.error.message,
    }).code(400);
  }
  const {
    name, year, author, summary,
    publisher, pageCount, readPage, reading,
  } = request.payload;

  if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  }

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

  const newBook = {
    id, name, year, author, summary,
    publisher, pageCount, readPage,
    finished, reading, insertedAt, updatedAt,
  };

  booksData.push(newBook);

  return h.response({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId: id,
    },
  }).code(201);
};


const updateBookById = (request, h) => {
  const { booksId } = request.params;
  const bookIndex = booksData.findIndex((b) => b.id === booksId);
  if (bookIndex === -1)
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan'
    }).code(404);
  const validation = updateBookSchema.validate(request.payload);
  if (validation.error) {
    return h.response({
      status: 'fail',
      message: validation.error.message,
    }).code(400);
  }
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;


  if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  }

  const updatedAt = new Date().toISOString();
  const finished = pageCount === readPage;

  booksData[bookIndex] = {
    ...booksData[bookIndex],
    name,
    ...(year !== undefined && { year }),
    ...(author !== undefined && { author }),
    ...(summary !== undefined && { summary }),
    ...(publisher !== undefined && { publisher }),
    ...(reading !== undefined && { reading }),
    pageCount, readPage,
    finished,
    updatedAt,
  };

  return h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  }).code(200);
};

const deleteBookById = (request, h) => {
  const { booksId } = request.params;
  const findIndex = booksData.findIndex((b) => b.id === booksId);
  if (findIndex === -1)
    return h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan'
    }).code(404);
  booksData.splice(findIndex, 1);
  return h.response({
    status: 'success',
    message: 'Buku berhasil dihapus',
  }).code(200);
};

module.exports = {
  getAllBooks,
  getBookById,
  addNewBook,
  updateBookById,
  deleteBookById
};