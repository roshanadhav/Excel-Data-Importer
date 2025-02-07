import User from "../models/user.js"
import Subscreption from '../models/subscreption.js';


export const getUserData  = async (req , res) =>{
    const {userId} = req.body ; 
    if (!userId) {
        return res.json({success : false , message : 'user not logged in'}) ;
    }
    try {
        const user = await User.findById(userId) ;
        if (!user) {
            return res.json({success : false , message : 'User Does Not Exists With Provided UserId'}) ; 
        }
        return res.json({success : true , message : 'returning the user data' , name : user.name , email : user.email , isveriFied : user.isveriFied})
    } catch (error) {
        return res.json({success : false , message : error.message})
    }
}


export const getSubscreptionData = async (req ,res)=>{
    try {
        const subscreption = await Subscreption.find({}) ;
        return res.json(subscreption)
        
    } catch (error) {
        return res.json({success : false , message : error.message })
    }
}