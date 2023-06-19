const express=require("express")
const mongoose=require("mongoose")
const cors = require('cors');
const bookrouter=require('./routes/bookRoutes');
require('dotenv').config();
const app=express()
app.use(cors());
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/BookMangaementSys',{useNewUrlParser:true}).then(()=>{
    console.log("connected to mongodb")
}).catch((err)=>{
    console.log(err)
})
app.use('/api/books',bookrouter)

app.listen(3000,()=>{
    console.log("running")
})