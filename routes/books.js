const express = require('express')
const router = express.Router()
const Book = require('../models/book')
const Author = require('../models/author')

// All Book Route
router.get('/', async (req, res) => {
 res.send("All books")
})

// New Book Route
router.get('/new', async (req, res) => {
  try {
    const authors = await Author.find({})
    const book = new Book()
    res.render("books/new",
    {
      authors : authors,
      book : book
    })
  } catch (error) {
    res.redirect("/books")
  }
  
})

// Create Book Route
router.post('/', async (req, res) => {
  res.send("Create book")
})

module.exports = router


