import razorpay from 'razorpay' ;
import dotenv from 'dotenv' ; 
dotenv.config() ; 


export const createRazorpayInstanc = ()=>{
    return  new razorpay({
        key_id : process.env.REZORPAY_KEY_ID, 
        key_secret : process.env.REZORPAY_SECREAT , 
    })
}

