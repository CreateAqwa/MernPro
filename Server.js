const express=require('express');
const mongoose=require("mongoose");

cors=require('cors'),
bodyParser = require('body-parser');
dbConfig=require('./database/DataBase');
// MOngoDb Setup
mongoose.Promise=global.Promise;
mongoose.connect(dbConfig.DataBase,{
    useUnifiedTopology:true,useNewUrlParser:true

})
.then(()=>{
    console.log("14 Line DataBase Connected");
},
error=>{
    console.log("line 17 DataBase Error Found Please Check Connection=>" +error);
})
// Express Setup
const Express=express();
Express.use(bodyParser.json());
Express.use(bodyParser.urlencoded({
    extended:false
}));
Express.use(cors());
Express.use(express.static(__dirname ));


const user=require('./Routers/Router');
Express.use('/',user);

const port =process.env.PORT || 4004;
const Server=Express.listen(port, () => {
    console.log("Now Live in  http://localhost:"+port+"/list");
})
Express.use((req,res,next) => {
    setImmediate(() => {
        next(new Error('In Port Access'))
        
    });
});

Express.use(function (err,req,res,next){
    console.log(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});