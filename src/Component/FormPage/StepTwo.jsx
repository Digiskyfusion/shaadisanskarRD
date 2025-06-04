import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";
import Image17 from '../../assets/Images/Image17.png';
import Navbar3 from "../Navbar/Navbar3";
import { ToastContainer, toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react'; 
import Footer from "../FooterPage/Footer";

const StepTwo = ({ formData, setFormData, prevStep }) => {
  let API = import.meta.env.VITE_APP_API_URL;
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // const handleSubmit = async () => {
  //   try {
  //     const password = formData.password;

  //     const passwordRegex =
  //       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  //     if (!passwordRegex.test(password)) {
  //       toast.error("पासवर्ड कम से कम 8 अक्षरों का होना चाहिए और इसमें बड़े अक्षर, छोटे अक्षर, नंबर और सिम्बल शामिल होना चाहिए।");
  //       return;
  //     }

  //     const res = await axios.post(`${API}user/register`, formData);
  //     const { token } = res.data;

  //     localStorage.setItem("token", token);
  //     localStorage.setItem("userProfile", JSON.stringify(res.data.user));
  //     toast.success("फॉर्म सफलतापूर्वक सबमिट हो गया");

  //     setFormData({
  //       profileFor: "",
  //       firstName: "",
  //       lastName: "",
  //       gender: "",
  //       mobileNumber: "",
  //       emailId: "",
  //       dob: "",
  //       password: "",
  //     });

  //     setTimeout(() => {
  //       navigate("/StepThree");
  //     }, 1500);
  //   } catch (err) {
  //     toast.warning("यूजर पहले से ही रजिस्टर है");
  //   }
  // };
const handleSubmit = async () => {
  try {
    const res = await axios.post(`${API}user/register`, formData);
    const { token } = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem("userProfile", JSON.stringify(res.data.user));
    toast.success("फॉर्म सफलतापूर्वक सबमिट हो गया");

    setFormData({
      profileFor: "",
      firstName: "",
      lastName: "",
      gender: "",
      mobileNumber: "",
      emailId: "",
      dob: "",
      password: "",
    });

    setTimeout(() => {
      navigate("/StepThree");
    }, 1500);
  } catch (err) {
    toast.warning("यूजर पहले से ही रजिस्टर है");
  }
};

  return (
    <>
      <div
        className="min-h-screen"
        style={{
          backgroundImage: `url(${Image17})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Navbar3 />
        <div className="min-h-screen flex items-center jost justify-center px-4 py-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md bg-[#DE5353] bg-opacity-90 rounded-2xl p-4 shadow-xl">
            <Link to="/register/step-one">
              <FaArrowCircleLeft
                className="text-2xl text-white cursor-pointer"
                onClick={prevStep}
              />
            </Link>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="space-y-3"
            >
              <ToastContainer />
              <h2 className="text-sm sm:text-xl text-center font-semibold text-black">
                बढ़िया! अब कुछ बुनियादी जानकारी भरें
              </h2>

              <div className="space-y-1">
                <label className="text-white block text-sm sm:text-xl">
                  फोन नंबर/<span className="lowercase text-lg">व्हाट्सएप नंबर उपयोग करें</span>
                </label>
                <input
                  type="text"
                  placeholder="व्हाट्सएप नंबर दर्ज करें"
                  value={formData.mobileNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, mobileNumber: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-white outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-white block text-sm sm:text-xl">ईमेल आईडी</label>
                <input
                  type="email"
                  required
                  placeholder="ईमेल आईडी"
                  value={formData.emailId}
                  onChange={(e) =>
                    setFormData({ ...formData, emailId: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-white outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-white block text-sm sm:text-xl">जन्म तिथि</label>
                <div className="flex gap-2 text-sm sm:text-xl">
                  <select
                    value={formData.dobDay}
                    onChange={(e) => {
                      const dobDay = e.target.value;
                      const { dobMonth, dobYear } = formData;
                      const dob =
                        dobYear && dobMonth && dobDay
                          ? `${dobYear}-${String(dobMonth).padStart(2, "0")}-${String(
                              dobDay
                            ).padStart(2, "0")}`
                          : "";
                      setFormData({ ...formData, dobDay, dob });
                    }}
                    className="w-1/3 px-3 py-2 rounded-lg bg-white outline-none"
                  >
                    <option value="">दिन</option>
                    {Array.from({ length: 31 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>

                  <select
                    value={formData.dobMonth}
                    onChange={(e) => {
                      const dobMonth = e.target.value;
                      const { dobDay, dobYear } = formData;
                      const dob =
                        dobYear && dobMonth && dobDay
                          ? `${dobYear}-${String(dobMonth).padStart(2, "0")}-${String(
                              dobDay
                            ).padStart(2, "0")}`
                          : "";
                      setFormData({ ...formData, dobMonth, dob });
                    }}
                    className="w-1/3 px-3 py-2 rounded-lg bg-white outline-none"
                  >
                    <option value="">महीना</option>
                    {[
                      "जनवरी",
                      "फ़रवरी",
                      "मार्च",
                      "अप्रैल",
                      "मई",
                      "जून",
                      "जुलाई",
                      "अगस्त",
                      "सितंबर",
                      "अक्टूबर",
                      "नवंबर",
                      "दिसंबर",
                    ].map((month, i) => (
                      <option key={i + 1} value={i + 1}>
                        {month}
                      </option>
                    ))}
                  </select>

                  <select
                    value={formData.dobYear}
                    onChange={(e) => {
                      const dobYear = e.target.value;
                      const { dobDay, dobMonth } = formData;
                      const dob =
                        dobYear && dobMonth && dobDay
                          ? `${dobYear}-${String(dobMonth).padStart(2, "0")}-${String(
                              dobDay
                            ).padStart(2, "0")}`
                          : "";
                      setFormData({ ...formData, dobYear, dob });
                    }}
                    className="w-1/3 px-3 py-2 rounded-lg bg-white outline-none"
                  >
                    <option value="">साल</option>
                    {Array.from({ length: 100 }, (_, i) => {
                      const currentYear = new Date().getFullYear();
                      const year = currentYear - 21 - i;
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className="space-y-1 relative">
                <label className="text-white block text-sm sm:text-xl">पासवर्ड</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="पासवर्ड"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-white outline-none pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-11 md:top-13 transform -translate-y-1/2 text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* <marquee>
                <p className="text-center text-yellow-500 text-sm rounded-md">
                  आपका पासवर्ड कम से कम 8 अक्षर का होना चाहिए और उसमें बड़े अक्षर, छोटे अक्षर, नंबर और सिम्बल होना आवश्यक है।
                </p>
              </marquee> */}

              <button
                type="submit"
                className="w-full mt-2 cursor-pointer bg-black text-white font-semibold text-sm sm:text-xl py-2 rounded-lg hover:bg-gray-900 transition"
              >
                साइन अप करें
              </button>

              <p className="text-center text-sm text-black mt-2">
                साइन अप करके, आप हमारी{" "}
                <span className="cursor-pointer text-white">शर्तों</span> से सहमत होते हैं
              </p>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StepTwo;
