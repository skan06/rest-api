//Importation mongoose
const mongoose=require("mongoose")
const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.linkDB)
        console.log("data base connected")
    } catch (error) {
        console.log("can't connect",error)
    }
}
module.exports=connectDB