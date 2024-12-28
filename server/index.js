import app from "./app.js"
import cloudinary from "cloudinary"
import dotenv from "dotenv"
dotenv.config()
const port=process.env.PORT ||8000

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_CLIENT_API,
    // api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
    api_secret: "M18xVvIRqWXyOerUd1SCC-LdPe0"
})

console.log(process.env.CLOUDINARY_CLIENT_SECRET)
app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})