const router = require("express").Router()
const { json } = require("express")
const { findById } = require("../models/Book.model")
const Book = require("../models/Book.model")

router.get("/", (req, res, next)=>{

    Book.find()
        .then(books => {("all books", books)
        res.render("books-list", {limon: books}) //limon is just a name i gave it but i didn't have to, i could have left it at {books}
        }) //alternative .then(console.log).cath(console.log)
        .catch(error => {console.log("error here",error)})
    
})


//to find it by params , you can always console.log(req.params to find the info) /:id 

router.get("/:id", (req, res, next)=>{

   //const {id} = req.params 
   //Book.findById(id)   another way to do it 

    Book.findById(req.params.id) 
    .then(data=>{console.log("here it is", data)
    res.render("book", {libro:data})
     })
     .catch(err => console.log(err))


})

//39:34 we are going to be creating books tomorrow 





















module.exports = router;