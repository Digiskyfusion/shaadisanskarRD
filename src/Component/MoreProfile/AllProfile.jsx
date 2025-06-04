import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// सभी प्रोफाइल दिखाने वाला कॉम्पोनेन्ट
function AllProfile() {
  let API = import.meta.env.VITE_APP_API_URL;
  const [data, setData] = useState([]); // प्रोफाइल डेटा स्टेट

  useEffect(() => {
    // यूज़र प्रोफाइल लाने का फ़ंक्शन
    const fetchUserProfile = async () => {
      try {
        const userProfile = JSON.parse(localStorage.getItem("userProfile"));
        if (!userProfile?._id) return;

        const userId = userProfile._id;
        const res = await axios.get(`${API}user/opposite/${userId}`);
        setData(res.data);
      } catch (error) {
        console.error("यूज़र प्रोफाइल लाने में त्रुटि:", error);
      }
    };

    fetchUserProfile(); // कंपोनेंट लोड होते ही कॉल करें
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {/* अगर डेटा है तो उसे दिखाओ, नहीं तो मैसेज दिखाओ */}
      {data.length > 0 ? (
        [...data].reverse().map((profile) => (
          <div
            key={profile._id}
            className=" rounded-2xl shadow-md pt-4 bg-[#FF5A60] min-h-[320px] flex flex-col justify-between transition-transform hover:shadow-lg hover:-translate-y-1"
          >
            <div className="px-10">
              <div className="flex justify-center items-center mb-4">
                <img
                  src={profile.userId?.profileImage}
                  alt="Profile"
                  className="w-28 h-28 object-cover rounded-full"
                />
              </div>
              <h2 className="text-center text-lg font-normal text-white italic mb-2">
                {profile.userId?.firstName} {profile.userId?.lastName}
              </h2>

              {/* प्रोफाइल डिटेल्स */}
              <div className="text-sm lg:text-[15px] text-white flex justify-center flex-wrap text-center gap-1">
                <div className="px-2 py-1 rounded-md">उम्र: {profile.age}</div>
                <div className="px-2 py-1 rounded-md">कद: {profile.height}</div>
                <div className="px-2 py-1">समुदाय: {profile.community}</div>
                {/* <div className="px-2 py-1">उप-समुदाय: {profile.subCommunity}</div> */}
                {/* <div className="px-2 py-1">वर्तमान निवास: {profile.currentresidence}</div> */}
                <div className="px-2 py-1">जहाँ पले-बढ़े: {profile.growup}</div>
              </div>
            </div>

            {/* प्रोफाइल देखने का बटन */}
            <div className="mt-4 bg-[#FFCCA8] rounded-b-2xl flex flex-col justify-center items-center py-3">
              <Link to={`/profile/${profile?.userId._id}`} >
                <button className="mt-2 bg-[#FF5A60] cursor-pointer text-white px-6 py-1 rounded-md hover:bg-red-500 transition">
                  प्रोफाइल देखें
                </button>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>इस समय कोई प्रोफाइल उपलब्ध नहीं है</p>
      )}
    </div>
  );
}

export default AllProfile;
