import mongoose from "mongoose";

const { Schema } = mongoose ;


const UserSchem  = new Schema({
    name : {
        type : String ,
        required : true 
    } , 
    email :  {
        type : String ,
        unique : true ,
        required : true ,
    } ,
    password : {
        type : String ,
        required : true , 
    } ,
    verifyOtp : {
        type : String , 
        default : '' ,
    } ,
    verifyOtpExpireAt : {
        type : Number ,
        default : 0 
    },
    isveriFied : {
        type : Boolean , 
         default : false 
    } , 
    resetOtp : {
        type : String ,
        default : ''
    } ,
    restOtpExpireAt : {
        type : Number , 
        default : 0 
    } ,
    ExcelWorks : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ExcelData"
        }
    ]
    
})


const User = mongoose.model.User ||  mongoose.model('User' , UserSchem)

export default User ;   