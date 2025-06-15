const Joi = require('@hapi/joi');

const addBookSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Gagal menambahkan buku. Mohon isi nama buku',
    'string.base': 'Nama buku harus berupa teks',
  }),
  year: Joi.number().required(),
  author: Joi.string().required(),
  summary: Joi.string().required(),
  publisher: Joi.string().required(),
  pageCount: Joi.number().required(),
  readPage: Joi.number().required(),
  reading: Joi.boolean().required(),
});

const updateBookSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Gagal memperbarui buku. Mohon isi nama buku',
    'string.base': 'Nama buku harus berupa teks'
  }),
  year: Joi.number(),
  author: Joi.string(),
  summary: Joi.string(),
  publisher: Joi.string(),
  pageCount: Joi.number().required(),
  readPage: Joi.number().required(),
  reading: Joi.boolean()
});

module.exports = { addBookSchema, updateBookSchema };