import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaReceipt, FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaCreditCard } from 'react-icons/fa';
import Footer from '../FooterPage/Footer';
import Navbar4 from '../Navbar/Navbar4';

const UserReceipts = () => {
  let API = import.meta.env.VITE_APP_API_URL;
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem("userProfile"));
  const userId = user?._id;

  useEffect(() => {
    const fetchReceipts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API}api/payment/receipts/${userId}`);
        setReceipts(res.data);
        setError(null);
      } catch (err) {
        setError('रसीदें प्राप्त करने में विफल रहा');
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchReceipts();
  }, [userId]);

  if (!userId) return <p className="text-center mt-10 text-red-500">कृपया रसीदें देखने के लिए लॉग इन करें।</p>;
  if (loading) return <p className="text-center mt-10 text-blue-500">रसीदें लोड हो रही हैं...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">📄 आपकी भुगतान रसीदें</h2>
        
        {receipts.length === 0 ? (
          <p className="text-center text-gray-600">कोई रसीद नहीं मिली।</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {receipts.map((receipt) => (
              <div
                key={receipt._id}
                className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition duration-300 border-t-4 border-[#FF5A60]"
              >
                <div className="mb-4 flex items-center gap-2 text-blue-600">
                  <FaReceipt className="text-xl" />
                  <h3 className="font-semibold text-lg">रसीद #{receipt._id.slice(-6)}</h3>
                </div>
                <ul className="text-sm space-y-2 text-gray-700">
                  <li><FaUser className="inline mr-1 text-blue-500" /> <strong>नाम:</strong> {receipt.firstName} {receipt.lastName}</li>
                  <li><FaEnvelope className="inline mr-1 text-blue-500" /> <strong>ईमेल:</strong> {receipt.email}</li>
                  <li><FaPhone className="inline mr-1 text-blue-500" /> <strong>मोबाइल:</strong> {receipt.mobileNumber}</li>
                  <li><strong>प्लान:</strong> <span className="text-green-600 font-semibold">{receipt.planName}</span></li>
                  {/* <li><strong>जोड़े गए क्रेडिट:</strong> {receipt.creditsAdded}</li> */}
                  {/* <li><strong>कुल क्रेडिट:</strong> {receipt.totalCredits}</li> */}
                  <li><FaCreditCard className="inline mr-1 text-blue-500" /> <strong>पेमेंट आईडी:</strong> {receipt.paymentId}</li>
                  <li><strong>ऑर्डर आईडी:</strong> {receipt.orderId}</li>
                  <li><FaCalendarAlt className="inline mr-1 text-blue-500" /> <strong>भुगतान तिथि:</strong> {new Date(receipt.paymentDate).toLocaleString()}</li>
                  <li><strong>बनाया गया:</strong> {new Date(receipt.createdAt).toLocaleString()}</li>
                  <li><strong>अपडेट किया गया:</strong> {new Date(receipt.updatedAt).toLocaleString()}</li>
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default UserReceipts;
