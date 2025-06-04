  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import Image18 from '../../assets/Images/Image18.png';
  import { FaArrowCircleLeft, FaChevronDown } from "react-icons/fa";
  import { Link, useNavigate } from 'react-router-dom';
  import { ToastContainer, toast } from 'react-toastify';

  function StepThree() {
    let API= import.meta.env.VITE_APP_API_URL
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');
    const [formData, setFormData] = useState({
      city: '',
      liveWithFamily: false,
      livingInIndiaSince: '',
      maritalStatus: '',  
      diet: '',
      height: '',
      gothram: '',
    });

    useEffect(() => {
      const fetchUserAndProfile = async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            navigate("/register/step-one");
            return;
          }

          const storedUser = JSON.parse(localStorage.getItem('userProfile'));
          const id = storedUser?.id || storedUser?._id;
          if (id) {
            setUserId(id);
            const res = await axios.get(`${API}api/profile/${id}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            if (res.data?.data) {
              setFormData(res.data.data);
            }
          }
        } catch (err) {
          console.error("Error fetching user profile:", err.message);
        }
      };
      fetchUserAndProfile();
    }, []);

    // const handleChange = (e) => {
    //   const { name, value, type, checked } = e.target;
    //   setFormData((prev) => ({
    //     ...prev,
    //     [name]: type === 'checkbox' ? checked : value.toUpperCase(),
    //   }));
    // };
  
const handleChange = (e) => {
  const { name, value, type, checked } = e.target;

  let finalValue = value;
  if (name === 'city') {
    finalValue = value.toUpperCase(); // Only uppercase city
  }

  setFormData((prev) => ({
    ...prev,
    [name]: type === 'checkbox' ? checked : finalValue,
  }));
};


    const handleFamilyClick = (value) => {
      setFormData((prev) => ({ ...prev, liveWithFamily: value }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!userId) {
        alert("User ID is missing. Please login again.");
        return;
      }

      try {
        const token = localStorage.getItem("token");
        const storedUser = JSON.parse(localStorage.getItem('userProfile'));
        const emailId = storedUser?.emailId;
        const mobileNumber = storedUser?.mobileNumber;
        if (!emailId || !mobileNumber) {
          alert("Email or phone missing.");
          return;
        }

        const fullData = { ...formData, userId };
        const res = await axios.post(`${API}api/profile`, fullData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Profile saved successfully!");
      //  toast.success("Profile saved successfully! wait for OTP ");
        // await axios.post('http://localhost:3000/api/auth/send-otp', {
        //   emailId, mobileNumber,
        // }, {
        //   headers: { Authorization: `Bearer ${token}` },
        // });

        // toast.success("OTP sent to your email and phone.");
        setTimeout(() => navigate('/login'), 1000);
      } catch (error) {
        const errorMsg = error.response?.data?.message || error.message;
        if (errorMsg.includes("already submitted")) {
          toast.warning("You already filled the form.");
        } else {
          toast.error("Something went wrong");
        }
        console.error(errorMsg);
      }
    };

    return (
      <div className="min-h-screen bg-white flex items-center jost justify-center p-6">
        <div className="flex flex-col md:flex-row w-full gap-2 md:gap-7 items-start shadow-2xl p-3 rounded-md">
          <div className="w-full md:flex-1 justify-center mb- md:mb-0">
            <img src={Image18} alt="Profile Step" className="w-full h-auto max-h-lvh object-cover rounded-lg" />
          </div>

          <div className="w-full md:flex-1 space-y-6">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <ToastContainer />
             <Link to="/">
               <button type="button" className="flex items-center cursor-pointer text-[#824A23]">
                <FaArrowCircleLeft className="mr-4 text-2xl" />
              </button>
             </Link>

              <h2 className="text-2xl text-center font-semibold gilda-display-regular">Create your profile now!</h2>

              {/* City */}
             <div>
  <label className="block font-medium">आप किस शहर में रहते हैं?*</label>
  <input
    type="text"
    name="city"
    value={formData.city}
    onChange={handleChange}
    className="mt-1 w-full border bg-[#E9D8C0] rounded-lg p-2 text-[11px] sm:text-[15px]"
  />
</div>


              {/* Live with family */}
             <div>
  <label className="block font-medium">क्या आप अपने परिवार के साथ रहते हैं?*</label>
  <div className="flex gap-4 mt-1">
    <button
      type="button"
      onClick={() => handleFamilyClick(true)}
      className={`px-4 py-2 cursor-pointer text-[11px] sm:text-[15px] rounded-lg ${formData.liveWithFamily ? 'bg-[#824A23] text-white' : 'bg-[#E9D8C0]'}`}
    >
      हाँ
    </button>
    <button
      type="button"
      onClick={() => handleFamilyClick(false)}
      className={`px-4 py-2 cursor-pointer text-[11px] sm:text-[15px] rounded-lg ${!formData.liveWithFamily ? 'bg-[#824A23] text-white' : 'bg-[#E9D8C0]'}`}
    >
      नहीं
    </button>
  </div>
</div>


              {/* Living in India since */}
              <div className="relative">
  <select
    name="livingInIndiaSince"
    value={formData.livingInIndiaSince}
    onChange={handleChange}
    className="mt-1 w-full text-[15px] sm:text-[19px] border-0 cursor-pointer border-b border-gray-400 py-2 pr-6 bg-transparent focus:outline-none appearance-none"
  >
    <option value="">आप भारत में कब से रह रहे हैं?*</option>
    <option value="Birth">जन्म से</option>
    <option value="Less than a year">1 साल से कम</option>
    <option value="1 year">1 साल</option>
    <option value="2 years">2 साल</option>
    <option value="3 years">3 साल</option>
    <option value="5 years">5 साल</option>
    <option value="7 years">7 साल</option>
    <option value="10 years">10 साल</option>
    <option value="15 years">15 साल</option>
    <option value="20 years">20 साल</option>
    <option value="25 years">25 साल</option>
    <option value="30+ years">30+ साल</option>
    <option value="Recently moved">हाल ही में आए हैं</option>
  </select>
  <FaChevronDown className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
</div>

              {/* Marital status */}
          <div className="relative">
  <select
    name="maritalStatus"
    value={formData.maritalStatus}
    onChange={handleChange}
    className="mt-1 w-full text-[14px] sm:text-[19px] border-0 cursor-pointer border-b border-gray-400 py-2 bg-transparent focus:outline-none appearance-none"
  >
    <option value="">आपकी वैवाहिक स्थिति*</option>
    <option value="Single">अविवाहित</option>
    <option value="Married">विवाहित</option>
    <option value="Divorced">तलाकशुदा</option>
    <option value="Widowed">विधवा/विधुर</option>
  </select>
  <FaChevronDown className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
</div>


              {/* Diet */}
             <div>
  <label className="block font-medium text-[14px] sm:text-[19px]">आपका आहार</label>
  <div className="grid grid-cols-2 gap-2 mt-1 cursor-pointer text-[11px] sm:text-[19px]">
    {[
      { value: 'Vegetarian', label: 'शाकाहारी' },
      { value: 'Non-Vegetarian', label: 'मांसाहारी' },
      { value: 'Vegan', label: 'शुद्ध शाकाहारी (Vegan)' },
      { value: 'Other', label: 'अन्य' }
    ].map((diet) => (
      <label key={diet.value} className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name="diet"
          value={diet.value}
          checked={formData.diet === diet.value}
          onChange={handleChange}
        />
        {diet.label}
      </label>
    ))}
  </div>
</div>


              {/* Height */}
              <div className="relative">
  <select
    name="height"
    value={formData.height}
    onChange={handleChange}
    className="mt-1 w-full text-[14px] sm:text-[19px] border-0 border-b cursor-pointer border-gray-400 py-2 pr-6 bg-transparent focus:outline-none appearance-none"
  >
    <option value="">आपकी ऊँचाई?*</option>
    {Array.from({ length: (7 - 4) * 12 + 1 }, (_, i) => {
      // कुल इंच = 4 फीट (48 इंच) + i
      const totalInches = 48 + i;
      const feet = Math.floor(totalInches / 12); // फीट निकालना
      const inches = totalInches % 12; // बचा हुआ इंच
      // अगर इंच 0 हो तो सिर्फ फीट दिखाएं, नहीं तो फीट और इंच दोनों
      const label = inches === 0 ? `${feet}'` : `${feet}'${inches}"`;
      return (
        <option key={label} value={label}>
          {label}
        </option>
      );
    })}
  </select>
  <FaChevronDown className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
</div>


              {/* Sub-community */}
              {/* Sub-community */}
             <div className="relative">
  <select
    name="gothram"
    value={formData.gothram}
    onChange={handleChange}
    className="mt-1 w-full text-[15px] sm:text-[19px] border-0 cursor-pointer border-b border-gray-400 py-2 pr-6 bg-transparent focus:outline-none appearance-none"
  >
    <option value="">गोत्र*</option>
    {[
      "गौशिल", "गौरुढ", "रावेल", "ढाकरी", "भरट", "भोरज", "बावल", "लल्याण", "गयंद",
      "गौरीयल", "गंगवेर", "अर्गल", "तपशिल", "पर्वोषि", "वामन", "परीवाल", "भूकर्ण", "ढापेल",
      "शुकवाल्य", "ब्रह्मपाल", "मोहरी", "वढगुर्ज", "श्विल्यान", "चर्वण", "खतंतर", "लोघर",
      "भारद", "भटनाग", "कौस्थंभ", "मल्लल्य", "कछप", "गौशल", "गुरदर", "लोढरी", "सुरघ्वज", "छांडल्य"
    ].map((community) => (
      <option key={community} value={community}>{community.toUpperCase()}</option>
    ))}
  </select>
  <FaChevronDown className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
</div>


              {/* Submit */}
              <div className="flex justify-center">
                <button type="submit" className="bg-[#824A23] w-full cursor-pointer text-white px-8 py-2 rounded-full">
                 जारी रखें

                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  export default StepThree;
