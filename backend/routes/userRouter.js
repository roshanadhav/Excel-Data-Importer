import express from 'express' ; 
import userAuth from '../middelwears/userAuth.js';
import { getUserData ,getSubscreptionData } from '../controllers/userController.js';



const userRouter = express.Router({mergeParams:true}) ; 




userRouter.get('/data' , userAuth , getUserData) ; 
userRouter.get('/subscreptions'  , getSubscreptionData) ; 




export default userRouter ; 