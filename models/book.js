const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true
  },

  Description: {
    type: String,
  },

  PublishDate: {
    type: Date,
    required: true
  },

  PageCount: {
    type: Number,
    required: true
  },

  CreatedAt: {
    type: Date,
    required: true,
    default: Date.now
  },

  CoverPageName: {
    type: String,
    required: true
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref : 'Author'
  }


})

module.exports = mongoose.model('Book', bookSchema)