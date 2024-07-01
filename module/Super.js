const mongoose=require("mongoose");
const VariableStorage=new mongoose.Schema({
    // _id:mongoose.Schema.Types.ObjectId,
    Name:{
        type:String,
        // required:true
    },
    Email:{
        type:String,
        // required:true,
        // unique:true
    },
    Mobile:{
        type:String,
        // required:true,
    },
    Password:{
        type:String,
        // required:true,
    },
    image:{
        type:String,
        // required:true,
    }
})
//last Digit => s <= Auto Add 
module.exports=mongoose.model("supers",VariableStorage);


// const loginmodel=new mongoose.Schema({
//     // _id:mongoose.Schema.Types.ObjectId,
//     Name:{
//         type:String,
//     },
//     Email:{
//         type:String,
//     },
//     Mobile:{
//         type:String,
//     },
//     Password:{
//         type:String,
//     },
//     image:{
//         type:String,
//     }
// })
// module.exports=mongoose.model("login",loginmodel);