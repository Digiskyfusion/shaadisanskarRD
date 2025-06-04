import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const FifthSection = () => {
  const API = import.meta.env.VITE_APP_API_URL;
  const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID;
  const navigate = useNavigate();

  
  const plans = [
    {
      name: "डायमंड",
      price: 199,
      // credits: "100 क्रेडिट्स",
      features: [
        "लोगों को संदेश भेजें",
        "अधिकतम 30 प्रोफाइल्स देखें",
        "अन्य प्रोफाइल्स से अलग दिखें",
      ],
    },
  ];

  const user = JSON.parse(localStorage.getItem("userProfile")) || null;
  const [processingPlan, setProcessingPlan] = useState(null);

  const handlePayment = async (plan) => {
    if (!user) {
      toast.warning("कृपया पहले लॉगिन करें।");
      setTimeout(() => navigate("/login"), 1000);
      return;
    }

    setProcessingPlan(plan.name);

    try {
      const { data } = await axios.post(`${API}api/payment/create-order`, {
        amount: plan.price ,
      });

      const options = {
        key: RAZORPAY_KEY,
        amount: data.amount,
        currency: data.currency,
        name: "Shaadi Website",
        description: `${plan.name} Plan Purchase`,
        order_id: data.id,
        handler: async function (response) {
          try {
            await axios.post(`${API}api/payment/verify-payment`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              userId: user._id,
              // plan: plan.credits,
              planName: plan.name,
            });
            toast.success("भुगतान सफल रहा! क्रेडिट्स जोड़ दिए गए हैं।");
            setTimeout(() => {
  window.location.href = `https://wa.me/917888386878`; // Replace with your actual number
}, 1000);

            // setTimeout(() => navigate("/userReceipts"), 1000);
          } catch (error) {
            toast.error("भुगतान सत्यापन विफल रहा।");
          } finally {
            setProcessingPlan(null);
          }
        },
        prefill: {
          name: `${user.firstName} ${user.lastName}`,
          email: user.emailId,
          contact: user.mobileNumber,
        },
        theme: { color: "#EB5757" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      rzp.on("payment.failed", (response) => {
        alert("भुगतान विफल: " + response.error.description);
        setProcessingPlan(null);
      });
    } catch (err) {
      toast.error("कुछ गलत हो गया। कृपया पुनः प्रयास करें।");
      setProcessingPlan(null);
    }
  };

  return (
    <div className="bg-pink-50 py-16 px-6 relative overflow-hidden">
      <ToastContainer />

      {/* Decorative Circles */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-red-300 rounded-full blur-3xl opacity-30 -z-10" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-red-400 rounded-full blur-3xl opacity-20 -z-10" />

      <div className="text-center mb-12">
  <h1 className="text-4xl font-bold text-black inline-block border-b-2 border-red-400 pb-2">
    रजिस्ट्रेशन
  </h1>
</div>


      {/* Centered Plans */}
      <div className="flex justify-center">
  <div className="flex flex-wrap justify-center gap-8 max-w-7xl">

          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-red-400 bg-opacity-10 backdrop-blur-lg p-8 rounded-3xl shadow-lg flex flex-col items-center text-white hover:scale-105 transition-transform duration-300`}
            >
              {/* Price badge */}
              <div className="absolute -top-6 w-24 h-24 bg-red-300 rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                ₹{plan.price}
              </div>

              <h2 className="mt-12 text-2xl font-bold mb-3">{plan.name}</h2>
              {/* <p className="mb-4 text-sm text-white">{plan.credits}</p> */}

              <ul className="space-y-3 mb-6 text-sm text-left w-full">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <span className="mr-3 text-lg text-green-400">✔</span>
                    <span className="text-white">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePayment(plan)}
                disabled={processingPlan === plan.name}
                className="w-80 py-2 bg-white rounded-full cursor-pointer font-semibold text-black hover:bg-black hover:text-white transition-all duration-300 disabled:opacity-50"
              >
                {processingPlan === plan.name
                  ? "प्रोसेस हो रहा है..."
                  : "जारी रखें"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FifthSection;
