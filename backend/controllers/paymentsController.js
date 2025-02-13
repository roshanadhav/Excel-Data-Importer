import Subscreption from "../models/subscreption.js";
import { createRazorpayInstanc } from "../config/rezorpay.config.js";
import crypto from 'crypto' ; 
import User from '../models/user.js'
const razorpayInstance = createRazorpayInstanc() ; 


export const createOrder = async (req , res)=>{
    const {subscriptionId , userId} = req.body ; 
    if (!subscriptionId || !userId) {
        return res.json({success : false , message : 'Missing Ids'})
    }
    try {
        const subscreption = await Subscreption.findById(subscriptionId) ;
        if (!subscreption) {
            return res.json({success : false , message : 'Subscreption Not found '})
        }
        const price = subscreption.price ;
        const options = {
            amount : price*100 , 
            currency : 'INR' , 
            receipt : 'recipt_subscression_1'
        }
        razorpayInstance.orders.create(options , (err , order)=>{
            if (err) {
                return res.json({success : false , message : err}) ; 
            } 
            return res.json(order) ; 
        })

    } catch (error) {
        return res.json({success : false , message : error.message}) ;
    }
}


export const verifyPayment = async (req , res)=>{
    const {order_id , payment_id , signature , userId , subscreption_id} = req.body  ; 
    console.log(req.body)
    if (!order_id || !payment_id || !signature || !userId || !subscreption_id) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const secreateKey = process.env.REZORPAY_SECREAT ; 

    // creating hmac object ->

    const hmac = crypto.createHmac("sha256" , secreateKey) ; 
    hmac.update(`${order_id.trim()}|${payment_id.trim()}`) ; 
    const genrateSignature = hmac.digest("hex") ; 


    if (genrateSignature === signature.trim() ) {
        // db operations  
        const user = await User.findById(userId) ; 
        if (!user ) {
            return res.json({success : false , message : 'User Not Found'})
        }
        user.sub = subscreption_id ; 
        await user.save() ; 
        return res.json({success : true , message : 'Payment Verified'})
    }
    else{
        return res.json({success : false , message : 'Payment Not Verified '})
    }




}