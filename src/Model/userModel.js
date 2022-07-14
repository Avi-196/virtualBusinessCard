const mongoose=require("mongoose")

const userDetailSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    designation:{
        type:String,
        required:true,
        trim:true
    },
    companyName:{
        type:String,
        trim:true
    },
    mobileNumber:{
        type:Number,
        required:true,
        unique:true,
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowerCase:true,
        trim:true
    },
    websiteURL:{
        type:String,
        required:true,
        unique:true
    },
    socialURL:{
        linkedIn:{
            type:String,
            unique:true
        },
        twitter:{
            type:String,
            unique:true
        },
        facebook:{
            type:String,
            unique:true
        }
    },
    companyLogo:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports=mongoose.model("User",userDetailSchema)


