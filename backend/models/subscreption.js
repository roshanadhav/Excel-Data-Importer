import mongoose from 'mongoose' ; 

const subscreptionSchema = new mongoose.Schema({
    name:{
        type : String , 
        required : true ,
    },
    price : {
        type : Number , 
        required : true ,
    },
    benifits : {
        facilites : [] 
    },
    discount : {
        type : String , 
        required : true , 
    },
    discountCoupan : {
        percent : []
    }
})

const Subscreption = mongoose.model('Subscreption' , subscreptionSchema) ; 

export default Subscreption ; 
