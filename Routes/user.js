// 1 Importation express
const express = require("express");
// 2 Importation Instence
const router= express.Router()
// 3 require schema model
const User=require("../model/User")
// 4 CRUD's creation
/* get:test
 * path:http://localhost:2000/api/users/test
*/ 
router.get("/test",(req,res)=>{
    res.send("hello")
})
/* post:add
 * path:http://localhost:2000/api/users/add
 * req.body 
*/ 
router.post("/add",async (req,res)=>{
    const {name,email,age}=req.body
    //handling errors
    if (!name.length || !email.length) {
        res.status(400).send({msg:"should add the new user's name and email"})
}
    //handling error email is unique
    const user= await User.findOne({email:email})
    if (user){
        res.status(400).send({msg:"email available"})
        }
    try {
        const newuser=new User({name,email,age})
        await newuser.save()
        res.status(200).send({msg:"user added",newuser})
    } catch (error) {
        res.status(400).send({msg:"no user added",error})
    }
})
/* post:get all
 * path:http://localhost:2000/api/users/
 *  
*/ 
router.get("/",async(req,res)=>{
    try {
        const userlist=await User.find()
        res.status(200).send({msg:"This is our list",userlist})
    } catch (error) {
        res.status(400).send({msg:"There's no list",error})
    }
})
/* post:get one
 * path:http://localhost:2000/api/users/:_id
 * req.params 
*/ 
router.get("/:_id",async(req,res)=>{
    try {
        const {_id}=req.params;
        let userToGet= await User.findOne({_id})
        res.status(200).send({msg:"This is our user",userToGet})
    } catch (error) {
        res.status(400).send({msg:"User unavailable",error})
    }
})
/* post:update
 * path:http://localhost:2000/api/users/edit/:_id
 * req.params && req.body
*/ 
router.put("/edit/:_id",async (req,res)=>{
try {
    let {name,email,age}=req.body;
    let {_id}=req.params
    await User.updateOne({_id},{$set:{...req.body}})
    res.status(200).send({msg:"Seccessful update"})
} catch (error) {
    res.status(400).send({msg:"Update failed",error})
}
})
/* post:delete
 * path:http://localhost:2000/api/users/delete/:_id
 * req.params
*/ 
router.delete("/delete/:_id",async (req,res)=>{
    try {
        let {_id}=req.params;
        await User.deleteOne({_id})
        res.status(200).send({msg:"User deleted"})
    } catch (error) {
        res.status(400).send({msg:"User not deleted",error})
    }
})

module.exports=router