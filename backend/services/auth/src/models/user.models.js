import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    firebaseUid:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
       unique:true,
        trim:true,
        lowercase:true
    },
    avatar:{
        type:String,
        default:""
    }

})

const User = mongoose.model("User",userSchema)

export default User