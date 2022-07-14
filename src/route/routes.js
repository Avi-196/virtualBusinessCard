const express=require("express")

const router=express.Router()

const userController=require("../Controller/userController")



router.post("/businessCard",userController.createUserDetails)

router.get("/user/:Id/cardDetails",userController.getuserDetails)


module.exports=router