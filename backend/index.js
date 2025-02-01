import express, { urlencoded } from 'express' 
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRouter from './routes/authRouter.js';
import connection from './database/db.js';
import userRouter from './routes/userRouter.js';
import excelRouter  from './routes/excelRouter.js';


connection()
const PORT = process.env.PORT || 5000

const app = express() ; 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}));



app.use('/api/auth' , authRouter ) ;
app.use('/api/user' , userRouter ) ;
app.use('/api/excel' , excelRouter ) ;



app.get('/' , (req,res)=>{
    res.send("everythin working properly ")
})


app.listen(PORT , ()=>{
    console.log(`Server is Listining on port ${PORT}`)
})