// 1 Importation express
const express = require("express");
// 2 Creation App
const app=express()
// 4 Creation dotenv
require("dotenv").config()
// 6 Connect DB
const connectdata=require("./config/connectdb")
connectdata()
// 3 Creation port
const port=process.env.PORT
// 8 Middleware
app.use(express.json())
// 7 Creation of route global
app.use("/api/users",require("./Routes/user"))
// 5 Creation de serveur
app.listen(port,(err)=>
{
    err
    ?console.log(err)
    :console.log(`Server is runnig on ${port}`)
}
)