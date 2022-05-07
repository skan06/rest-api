const  mongoose= require("mongoose");
const {Schema}=mongoose
const userSchema=new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    age:Number
})
module.exports=User=mongoose.model("User",userSchema)