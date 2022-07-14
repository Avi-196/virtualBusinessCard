
//importing module to use in this file we everything in node js modules they are state in 
//provate mood in evry file so if we have need to use in other file we have to import file by using require


const userModel=require("../Model/userModel")
const aws=require("../Controller/awsController")



//isValid is create for validation that if user provide epty string it through error towards the user
const isValid=function (value){
    if(typeof value ==="undefined"||typeof value ===null) return false
    if(typeof value ==='string' &&  value.trim().length ===0) return false
    return true
}

//here using validation for uploading file or logo or image
const isValidfiles = function (files) {
    if (files && files.length > 0)
        return true
}

const createUserDetails=async function(req,res){
    try{
    let data=req.body

    let files=req.files

    let{name,designation,companyName,mobileNumber,emailId,websiteURL,socialURL}=data
    
    if(Object.keys(data).length==0){
        return res.status(400).send({status:false,msg:"empty data"})
    }
    if(!isValid(name)){
        return res.status(400).send({status:false,msg:"please fill the Name"})
    }
    if(!isValid(designation)){
        return res.status(400).send({status:false,msg:"please fill the Designation"})
    }
     
    if(!isValid(mobileNumber)){
      return res.status(400).send({status:false,msg:"please fill monileNumber"})
    }
     //using regex for mobilenumber validation if its greater than or less than 10 digit it will through error
    if(!(/^\d{10}$/.test(mobileNumber))) {
        res.status(400).send({ status: false, msg: "Invalid mobileNumber it should be of 10 digits" })
        return
    }
    if(!isValid(emailId)){
        return res.status(400).send({status:false,msg:"please fill the emailId"})
    }
    //here using regex for email validation like if"@" or www not given it will through error
    if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(emailId))) {
        return res.status(400).send({ status: false, msg: "Invalid emailId" })
        
    }

    if(!isValid(websiteURL)){
        return res.status(400).send({status:false,msg:"websiteURL is required"})
    }

   if(!isValid(socialURL)){
        return res.status(400).send({status:false,msg:"socialUrl is required"})
   }


    if (!isValidfiles(files)) {
        res.status(400).send({ status: false, Message: "Please provide companyLogo" })
        return
    }
   //uploaded company logo in aws site then it has been  provide link that link ha stored in database
    companyLogo=await aws.uploadFile(files[0])



    let isEmailIdAlreadyPresent=await userModel.findOne({emailId})
    if(isEmailIdAlreadyPresent){
        return res.status(406).send({status:false,msg:"this emailId is already taken"})
    }

    let ismobileNumberPresent=await userModel.findOne({mobileNumber})
    if(ismobileNumberPresent){
        return res.status(406).send({status:false,msg:"this mobileNumber is already taken"})
    }

   const userData={
      name,designation,companyName,mobileNumber,emailId,websiteURL,socialURL,companyLogo
   }
     
   const userdataCreated=await userModel.create(userData)
   return res.status(201).send({status:true,msg:"sucessfully created",data:userdataCreated})


}catch(error){
    res.status(500).send({status:false,msg:error.message})

}

}


const getuserDetails=async function(req,res){
      
      try{  
        
       const Id=req.params.Id
      const userdetailsMatch=await userModel.findOne({_id:Id})
      console.log(userdetailsMatch)
      if(!userdetailsMatch){
        return res.status(404).send({status:false,msg:"details are not found"})
      }
      return res.status(200).send({status:true,msg:"details found",data:userdetailsMatch})
    }
 catch(error){
    res.status(500).send({status:false,msg:error.message})

}
}


module.exports.createUserDetails=createUserDetails
module.exports.getuserDetails=getuserDetails
