var express =require('express');
var router =express.Router();
var Super=require("../module/Super");
const fs = require("fs");


router.get('/', async(req,res,next)=>{
    const rec= await Super.find({});
        return res.status(200).send(rec)
})
router.get('/all_data_list',async(req,res,next)=>{
    try{      
        const rec=await Super.find({});
        if (rec){
             return res.status(200).send(rec) }
        
        else{
            return res.status(200).send({"message":"Data Not Found"})
        }
    }
    catch(error){
        return res.status(500).send(error)
    }
})
//------------POST----------------------------------


// router.post('/list',async(req,res,next)=>{
//     console.log(req.body);
//     // const /=new router fileName({})
//    try{
//     const sign_data=new Super({
//         Name:req.body.Name,
//         Email:req.body.Email,
//         Mobile:req.body.Mobile,
//         Password:req.body.Password,
//     })
//     if (sign_data){
//         sign_data.save();
//         return res.status(200).send({'message':'Record Submited Successfully'})
//     }
//     else{
//         return res.status(200).send({'message':'Error-------------------'})
//     }

//    }
//    catch(err){
//     return err.status(500).send({'message':'Error-2------------------'})
//    }
// })



// File Upload With Data Image,and Form Start
//Simple Save Only Start


// File Upload With Data Image,and Form End
//Simple Save Only Start
// ======extra==============


// =======extra=============

//password security start
const bcrypt =require('bcrypt');
const saltRounds =10;
//password security end
const multer=require('multer');
const path=require('path');

const MulterStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'upload/')
        //  cb(null, path.dirname('D:/'))
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"-"+Date.now()+path.extname(file.originalname))
        // cb(null,file.originalname)
    }
})
router.post('/Post_newData',(req,res,next)=>{
    // // req.body not work with file (command prompt) npm i multer
    // console.log(req.body); 
// // for Create Folder ID Name Start===============
// const id_Folder = "upload/"+recived.id+'/';
// fs.access(id_Folder, (error) => {
//     // To check if the given directory   // already exists or not
//    if (error) {
//     // If current directory does not exist    // then create it
//     fs.mkdir(id_Folder, (error) => {
//       if (error) {
//         console.log(error, 'i am error line 135');
//       } else {
//         console.log("ID_Folder Created New Directory created successfully !!=> ");
//       }
//     });
//   } else {
//     console.log("Given Directory already exists !!");
//   }
// });;
// // for Create Folder ID Name End==============
    
    let upload=multer({storage:MulterStorage}).single('attach');//file Save
    upload(req,res,(err)=>{
        if (err){
            console.log("File Not Uploaded");
        }
        else{
            console.log("Upload SuccessFully");
            // console.log(req.body);
            let c_Password=req.body.Password;
            const hash=bcrypt.hashSync(c_Password,saltRounds);
            if (!req.file) {   //if Don't have File
                var sign_data=new Super({
                    Name:req.body.Name,
                    Email:req.body.Email,
                    Mobile:req.body.Mobile,
                    Password:hash,
                    image:'upload/NoIMAGE.jpg',
                });
                let recived=sign_data.save();
                if(recived){
                    console.log(sign_data);
                    return res.status(200).send({'message':'SignUp SuccessFully'})
                }
                else{
                    return res.status(200).send({'message':'Error Found In Post If Else Line No:=> 125'})
                }

            }
            else   //if have File
            {
                var sign_data=new Super({
                    Name:req.body.Name,
                    Email:req.body.Email,
                    Mobile:req.body.Mobile,
                    Password:hash,
                    image:req.file.destination+req.file.filename,
                });
                let recived=sign_data.save();
                if(recived){
                    console.log(sign_data);
                    return res.status(200).send({'message':'SignUp SuccessFully'})
                }
                else{
                    return res.status(200).send({'message':'Error Found In Post If Else Line No:=> 125'})
                }
            }
            
        }
    })
})
// ?----------POST----------------------------------

// ?----------Delete----------------------------------
// const fs = require("fs");
// const path = require("path");
router.delete('/delete_OneDAta/:id',async(req,res,next)=>{
    console.log(req.params.id);
    // console.log(req.body._id);
    try{
        // rec=await ModelsFileName.findByIdAndDelete({'_id':req.params.id});
        rec=await Super.findByIdAndDelete({'_id':req.params.id});
        if (rec){
        //  FOr Delete Image start
        var filePath = rec.image;
        fs.unlinkSync(filePath);
        // //  FOr Delete Image End

            return res.status(200).send({'message':'record deleted successfully'})
        }
        else{
            return res.status(200).send({'message':'Record Not Found'})
        }
    }
    catch(err)
    {
        return res.status(500).send(err)
    }

})


router.get('/one_data_get/:id',async(req,res,next)=>{
    // console.log(req.params.id);
    try{
        //const varName =await ModuleMongoDbFile(Like Scama).findone({'_id':"req.params.id"});
        const rec=await Super.findById({'_id':req.params.id});
        // console.log(rec);
        if(rec)
        {
            return res.status(200).send(rec)
        }
        else{
            return res.status(200).send({'message':"Data Not Found"})
        }
    }
    catch(err){
        res.status(500).send(err)
    }
})

router.put('/Update_data',async(req,res,next)=>{
    // console.log(req.params.id);
    // console.log(req.body._id);

    //  error not value(data) if you Transfer data Via=> UseState
    // Please Use Form Data() in fruntend append trick
    // Like this=>
    //     const formData=new FormData();
    //     formData.append('Name',state.Name);
    try{
        let upload=multer({storage:MulterStorage}).single('attach');//file Save
        upload(req,res,async (err)=>{
            let email=req.body.Email;
            console.log(req.body,"pp-ppp-p-p----pp-p-");
            if (err){
                console.log("File Not Uploaded");
            }
            else{
                // for get old image data Start(For delete old immge)
                const rec=await Super.findById({'_id':req.body._id});
                let oldimage=rec.image;
                // for get old image data End
                // (For delete old immge)

                // Password bycrypt Converter ENd
                let c_Password=req.body.Password;
                const hash=bcrypt.hashSync(c_Password,saltRounds);
                // Password bycrypt Converter ENd
                if (!req.file) {
                    const a={
                        Name:req.body.Name,
                        Email:req.body.Email,
                        Mobile:req.body.Mobile,
                        Password:hash,
                        image:req.body.image,
                    }
                    console.log(req.body,"_______________");
                    // Data Update
                    // const recdata= await Super.updateOne({'Email':email},a,{new:true})
                    const recdata= await Super.updateOne({'_id':req.body._id},a,{new:true})
                    if (recdata){
                        console.log("You Not Uploaded File");
                        return res.send({
                        'message':'Record Updated Successfully',
                        'err':0,
                        'data':recdata
                    })
                    }
                    else{
                        
                        return res.send({
                            'message':'Record Error',
                            'err': 1,
                        })
                    }

                }
                else{
                    const a={
                        Name:req.body.Name,
                        Email:req.body.Email,
                        Mobile:req.body.Mobile,
                        Password:hash,
                        image:req.file.destination+req.file.filename,
                    }
                    console.log(req.body,"_______________");
                    // Data Update
                    const recdata= await Super.updateOne({'_id':req.body._id},a,{new:true})
                    if (recdata){
                        // for delete old image Start
                        var filePath = oldimage
                        fs.unlinkSync(filePath);
                        // for delete old image END
                        console.log("File Uploaded Successfully");
                        return res.send({
                        'message':'Record Updated Successfully',
                        'err':0,
                        'data':recdata
                    })
                    }
                    else{
                        
                        return res.send({
                            'message':'Record Error',
                            'err': 1,
                        })
                    }
                }
                
            }
        })
    }
    catch(error){
        console.log("I am catch error");
        return res.status(500).send(error)
    }
})
// Auth Services For Find by Email => mobile no password name mobile
// npm i jsonwebtoken

const jwt=require('jsonwebtoken');
const { log } = require('console');
const { timeout } = require('cjs');
const jwtsecret='9999777ggvv666nhhhhh'
router.post('/login',async(req,res,next)=>{
    // console.log(req.body);
    user=req.body.username;
    pass=req.body.password;
    try {
        const rec=await Super.findOne({Email:user});
        // console.log(rec);
            if(rec){
                // res.json({'err':1,'data':rec})
                console.log(rec.Password);

                if(bcrypt.compareSync(pass, rec.Password)){
                        let payload={uid:user};
                        console.log(payload);
                        let token=jwt.Super(payload,jwtsecret,{expiresIn:360000}); //for Genrate Token number
                        res.json({  'err':0,
                                    'msg':'Login Successfull',
                                    'token':token})
                    }
                    else {
                        res.json({'err':0,'msg':'Error Pass Email'});
                    } 


            }
            // else if (rec==null){
            //     res.json({'err':1,'msg':'Email or PAss Error'});
            // }
            // else
            // {
            //     console.log("Login SuccessFully");
                // if(bcrypt.compareSync(pass, data.pass)){
                //     let payload={uid:user};
                //     console.log(payload);
                //     let token=jwt.sign(payload,jwtsecret,{expiresIn}); //for Genrate Token number
                //     res.json({'err':0,'msg':'Login Successfull','token':token})
                // }
                // else {
                //     res.json({'err':0,'msg':'Error Pass Email'});
                // }
            // }









        // Super.findOne({Email:user},(err,data)=>{
        //     console.log(data);
        //     if(err){
        //         res.json({'err':1,'msg':"Email or Password Not Correct"})
        //     }
        //     else if (data==null){
        //         res.json({'err':1,'msg':'Email or PAss Error'});
        //     }
        //     else{
        //         console.log("Login SuccessFully");
                // if(bcrypt.compareSync(pass, data.pass)){
                //     let payload={uid:user};
                //     console.log(payload);
                //     let token=jwt.sign(payload,jwtsecret,{expiresIn}); //for Genrate Token number
                //     res.json({'err':0,'msg':'Login Successfull','token':token})
                // }
                // else {
                //     res.json({'err':0,'msg':'Error Pass Email'});
                // }
            // }
            
        // })
        
    } 
    catch (error) {
        return res.status(500).send(error)
    }
})

module.exports = router;
