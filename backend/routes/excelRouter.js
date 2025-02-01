import express from 'express'
import userAuth from '../middelwears/userAuth.js' ; 
import Excel from '../models/excel.js';
import { storeDataByValiditing } from '../controllers/excelControllers.js';

const excelRouter = express.Router({mergeParams : true }) ; 




excelRouter.post('/store' , userAuth , storeDataByValiditing  );



export default excelRouter  ; 