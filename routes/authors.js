const express = require('express')
const router = express.Router()
const Author = require('../models/author.js')

//All Authors Routes
router.get('/', async (req, res) => {

    try {
        let serachoption = {}
        if(req.query.name != null && req.query.name !== '')
        {
            serachoption.name = new RegExp(req.query.name, 'i')
        }
        const authors = await Author.find(serachoption)
        res.render('authors/authors', {
            authors : authors,
            serachoption : req.query
        })
        } catch (err) {
            res.redirect('/')
            }
    })

//New Author Route
router.get('/new',(req, res) => {
    res.render('authors/new', {author : new Author() })
})

//Create Author Route (Using Async..await)
router.post('/', async (req, res) => {

    const author = new Author({
        name : req.body.name
    })
    try {
        const newAuthor = await author.save()
            //res.redirect(`authors/${newAuthor}`)
            res.redirect(`authors`)

        } catch (err) {
        res.render('authors/new', {
            author: author,
            errorMessage : 'Error Creating Author'
            })
        }
    })

//Create Author Route (Using callback funtion)
// router.post('/', (req, res) => {

//     const author = new Author({
//         name : req.body.name
//     })

//     author.save((err, newAuthor) => {
//         if (err){
//             res.render('authors/new', {
//                 author: author,
//                 errorMessage : 'Error Creating Author'
//             })
//         }else{
//             //res.redirect(`authors/${newAuthor}`)
//             res.redirect(`authors`)
//         }
//     })
// })

module.exports = router


