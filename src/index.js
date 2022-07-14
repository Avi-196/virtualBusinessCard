const express=require("express")
//required express which i have installed in package.json 

const bodyParser=require("body-parser")

const route=require("./route/routes.js")

const mongoose=require("mongoose")
//multer node js middleware to handel multipartdata for uploading files.
const multer=require("multer")

const app=express()
//here i have stored express as function in app variable

app.use(bodyParser.json())
//here i am using bodyParser middleware to parse the data in json format
app.use(bodyParser.urlencoded({ extended: true }));

app.use(multer().any())

mongoose.connect("mongodb://localhost:27017",{
  
    useUnifiedTopology: true
})
.then(()=>console.log("mongoDB connected"))
.catch(err=>console.log(err))

app.use('/',route)

app.listen(process.env.PORT||4000,function(){
    console.log("express is running on port"+(process.env.PORT||4000))
})
