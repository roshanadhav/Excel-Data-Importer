import express from 'express' ; 
import { createOrder, verifyPayment } from '../controllers/paymentsController.js';
import userAuth from '../middelwears/userAuth.js';

const paymentRouter = express.Router({mergeParams : true}) ; 



paymentRouter.post('/createOrder' ,userAuth, createOrder);

paymentRouter.post('/verifyPayment' ,userAuth ,  verifyPayment) ; 



export default paymentRouter ; 