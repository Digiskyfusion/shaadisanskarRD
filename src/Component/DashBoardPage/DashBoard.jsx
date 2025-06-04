import React, { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ProfileOne from '../MyProfilePage/ProfileOne';
import axios from 'axios';

function DashBoard() {
  let API = import.meta.env.VITE_APP_API_URL;
  const [invitations, setInvitations] = useState([]);
  const [credits, setcredits] = useState();
  const scrollRef = useRef(null);
  let a = JSON.parse(localStorage.getItem("userProfile"));
  let userId = a._id;

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const res = await axios.get(`${API}user/opposite/${userId}`);
        setInvitations(res.data);
        console.log("dashboard data", res.data);
      } catch (error) {
        console.error('निमंत्रण लाने में त्रुटि:', error);
      }
    };

    const fetchCredits = async () => {
      let res = await axios.get(`${API}user/${userId}`);
      setcredits(res.data.user);
    };

    fetchCredits();
    if (userId) fetchInvitations();
  }, [userId]);

  const handleScroll = (direction) => {
    const scrollAmount = 500;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'right' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="bg-[#FAF4EE] p-4 jost md:p-8">
      <div className="flex flex-col lg:flex-row lg:justify-center lg:px-10 items-center gap-6 mt-4">
        <div className="max-w-sm w-full">
          <ProfileOne />
        </div>

        <div className="flex flex-col gap-6 w-full">
          <div className="bg-[#FF5A60] rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-white mb-8">आपकी गतिविधि</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-[#FAF4EE] rounded-xl p-4 flex flex-col items-center text-center shadow-sm">
                {/* <span className="text-2xl font-bold text-black">{credits?.credits}</span> */}
                <span className="text-2xl font-bold text-black">{0}</span>
                <span className="text-sm text-black">आपके क्रेडिट्स</span>
              </div>
              <div className="bg-[#FAF4EE] rounded-xl p-4 flex flex-col items-center text-center shadow-sm">
                <span className="text-2xl font-bold text-black">0</span>
                <span className="text-sm text-black">आपने उपयोगकर्ता से बात की है</span>
              </div>
              <div className="bg-[#FAF4EE] rounded-xl p-4 flex flex-col items-center text-center shadow-sm">
                <span className="text-2xl font-bold text-black">0</span>
                <span className="text-sm text-black">आपका खाता प्रदर्शन</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl relative">
            <h2 className="text-lg font-semibold text-black mb-4 text-center">उपयोगकर्ता</h2>

            <button
              onClick={() => handleScroll('left')}
              className="absolute left-2 top-1/2 cursor-pointer transform -translate-y-1/2 bg-white border shadow-md rounded-full p-2 z-10 hover:bg-[#f4ece7]"
            >
              <FaChevronLeft className="text-[#824A23]" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="absolute right-2 top-1/2 cursor-pointer transform -translate-y-1/2 bg-white border shadow-md rounded-full p-2 z-10 hover:bg-[#f4ece7]"
            >
              <FaChevronRight className="text-[#824A23]" />
            </button>

            <div
              ref={scrollRef}
              className="flex items-center gap-5 xl:gap-10 p-2 lg:max-w-xl xl:max-w-5xl overflow-x-auto no-scrollbar px-4 sm:px-10 scroll-smooth"
            >
              {invitations.map((invitation, index) => (
                <div
                  key={index}
                  className="w-[260px] sm:w-[200px] md:w-[210px] xl:w-[265px] bg-[#FF5A60] rounded-2xl py-10 text-center flex-shrink-0 flex flex-col items-center justify-between"
                >
                  <img
                    src={invitation.userId?.profileImage || 'https://img.freepik.com/free-psd/contact-icon-illustration-isolated_23-2151903337.jpg?t=st=1746421661~exp=1746425261~hmac=94de5d3835e78ee5b387f34b0214b3683e7436a1738902e45cc16be9f41b682b&w=826'}
                    alt={`प्रोफ़ाइल चित्र - ${invitation.userId?.profileImage}`}
                    className="w-24 h-24 rounded-md object-cover mb-3 border-4 border-white shadow-md"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-black capitalize">
                      {invitation.userId?.firstName} {invitation.userId?.lastName}
                    </h3>
                    <p className="text-sm text-black mt-1">
                      {invitation.age} वर्ष, {invitation.city}, {invitation.growup}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
