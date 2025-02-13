import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const SubscriptionCard = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const loadScript = (src) => {
        return new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = src;
          script.async = true;
          script.onload = () => resolve();
          script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
          document.body.appendChild(script);
        });
      };
      useEffect(()=>{
        loadScript("https://checkout.razorpay.com/v1/checkout.js")
        .then(() => console.log("Razorpay script loaded successfully"))
        .catch((error) => console.error(error));
      } ,[])


      

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/subscreptions`, { withCredentials: true })
            .then(response => {
                setSubscriptions(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching subscriptions:", error);
                setLoading(false);
            });
    }, []);

    const handlePurchase = async (subscriptionId) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/payment/createOrder`, { subscriptionId });
            toast.success("Order created successfully!");
            const data = response.data ;
            const paymentObject = new window.Razorpay({
                key : import.meta.env.REZORPAY_KEY_ID ,
                order_id : data.id , 
                ...data ,
                handler : function(response){
                    console.log(response) ; 

                    const options2 ={
                        order_id : response.razorpay_order_id , 
                        payment_id : response.razorpay_payment_id , 
                        signature: response.razorpay_signature,
                    }
                     axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/payment/verifyPayment` , {subscreption_id : subscriptionId , ...options2} , {withCredentials: true} )
                     .then(res=>{
                        if (res?.data?.success) {
                            toast.success('Payment Sucessfull')
                        }
                     })
                     .catch(err=>{
                        toast.error('Payment Not Sucessfull')
                        console.log(err)
                    }); 
                    
                } 
            });
            paymentObject.open();
            
        } catch (error) {
            console.error("Error creating order:", error);
        }
    };

    if (loading) return <p className="text-center text-lg font-semibold">Loading subscriptions...</p>;
    return (
        <div className="p-6 mt-50 h-full grid grid-cols-1 md:grid-cols-3 mb-40 gap-6">
            {subscriptions.map((sub) => (
                <div 
                    key={sub._id} 
                    className="relative shadow-lg p-6 border rounded-2xl bg-white text-gray-800 text-center overflow-hidden"
                >
                    <img 
                        src="https://finexo.in/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Ftb3xbyw3%2Fproduction%2Ff1ae2cc3f9fcdcb2fc581ec6960b60c656fb7a70-700x150.png%3Fw%3D700%26auto%3Dformat&w=640&q=75" 
                        alt="Subscription Logo" 
                        className="mx-auto w-30 mb-4"
                    />
                    <h2 className="text-2xl font-bold text-gray-900">{sub.name}</h2>
                    <p className="text-lg font-semibold text-gray-700">Price: ₹{sub.price}</p>
                    <p className="text-green-500 font-semibold">Discount: {sub.discount}%</p>
                    <ul className="mt-3 text-sm list-disc list-inside text-gray-600">
                        {sub.benifits.facilites.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                        ))}
                    </ul>
                    <button 
                        className="mt-4 w-full bg-gray-800 text-white font-bold py-2 rounded-xl shadow-lg hover:bg-gray-900 transition"
                        onClick={() => handlePurchase(sub._id)}
                    >
                        Purchase
                    </button>
                </div>
            ))}
        </div>
    );
};

export default SubscriptionCard;