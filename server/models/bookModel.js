const mongoose=require("mongoose")
const bookSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"please specify the title"]
    },
    author:{
        type:String,
        required:[true,"please specify the title"]
    },
    year:{
        type:Number,
        required:[true,"please specify the title"]
    }
},{ versionKey: false }
);
module.exports=mongoose.model("Book",bookSchema);