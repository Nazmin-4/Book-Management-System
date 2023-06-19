const express= require("express")
const router=express.Router();
const bookcontroller=require('../controllers/bookController')
router.get('/',bookcontroller.getAllBooks)
router.get('/:id',bookcontroller.getBookById)
router.post('/',bookcontroller.postBook)
router.put('/:id',bookcontroller.updateBook)
router.delete('/:id',bookcontroller.deleteBook)
router.get('/api/books/search', bookcontroller.getBooksBySearch);
module.exports=router;