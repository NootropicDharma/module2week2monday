const router = require("express").Router()
const { json } = require("express")
const { findById } = require("../models/Book.model")
const Book = require("../models/Book.model")

router.get("/", (req, res, next)=>{
    //R READ 
    Book.find()
        .then(books => {("all books", books)
        res.render("books-list", {limon: books}) //limon is just a name i gave it but i didn't have to, i could have left it at {books}
        }) //alternative .then(console.log).cath(console.log)
        .catch(error => {console.log("error here",error)})
    
})

//a get to show form to register a new book
router.get("/create", (req, res, next)=>{
    res.render("create-book")
})




router.post("/create", (req, res, next)=>{
   
    // C CREATE 
    Book.create(req.body) //OR Book.create({...req.body}) dylan way and this other way is Harland
    .then(data=> {
        // res.render("successful", data) 
        res.redirect("/books")
    })
    .catch(err=>{console.log(err)})
   
})



//to find it by params , you can always console.log(req.params to find the info) /:id 

router.get("/:id", (req, res, next)=>{

   //const {id} = req.params 
   //basically const id = req.params.id  same thing as above 
   //Book.findById(id)   another way to do it 
    // R READ 
    Book.findById(req.params.id) 
    .then(data=>{console.log("here it is", data)
    res.render("book", {libro:data})
     })
     .catch(err => console.log(err))


})


// U UPDATE GET  show a form with pre filled info 

router.get("/:id/edit", (req, res, next)=>{
    
    Book.findById(req.params.id)
    .then(datos=> {
        
        res.render("update", {book: datos})
    })
    .catch(err=>{console.log("error here", err)})
})

// EXTRA we can find by title
// router.get("/:title/title", (req, res, next)=>{
//     const {title} = req.params

//     Book.find({title})
//     .then(libro => {      //this will bring us an array of books 
       
//         res.render("update", {book: libro[0]})
//     })
//     .catch(err=>{console.log(err)})

// })

// U UPDATE POST  submit new POST info 


router.post("/:id/edit", (req, res, next)=>{
    //:id can be anything really :libro :pollo :auto :identificador
    const {id} = req.params
    const {title, description, author,rating} = req.body
    console.log("log it please",req.params.id)
    console.log("this is the body",req.body)
                    //the id,  what we are updating {req.body}, {new:true} will return updated info
    Book.findByIdAndUpdate(id, req.body, { new: true} )
    .then(updatedBook=>{
        console.log("updated book", updatedBook)
        //res.send(updatedBook) This sends a JSON file on the screen
        res.redirect(`/books/${id}`)
    })
    .catch(err=>console.log(err))

})



//D DELETE 

router.post("/:id/delete", (req, res, next)=>{

    const {id} = req.params

    Book.findByIdAndDelete(id)
    .then(()=>res.redirect("/books"))
    .catch(err=>console.log(err))

})













module.exports = router;