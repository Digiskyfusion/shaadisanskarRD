import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../FooterPage/Footer';
import Navbar4 from '../Navbar/Navbar4';
import { FaWhatsapp } from "react-icons/fa";
import { BsChatRightHeartFill } from "react-icons/bs";
import {
  FaUser, FaVenusMars, FaCity, FaBirthdayCake, FaHeartbeat, FaUsers, FaUniversity,
  FaBuilding, FaMoneyBillWave, FaHome, FaLanguage, FaBalanceScale, FaMapMarkerAlt,
  FaRegClock, FaUtensils
} from 'react-icons/fa';
import {
  GiFamilyTree, GiLoveMystery, GiHealthNormal, GiIndiaGate,
  GiBodyHeight, GiGothicCross
} from 'react-icons/gi';
import { ToastContainer, toast } from 'react-toastify';

function ProfileDetails() {
  let API = import.meta.env.VITE_APP_API_URL;
  const { userId } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [CurrentUser, setCurrentUser] = useState(null);
  const [showNumber, setShowNumber] = useState(false);
  const [hasDeductedCredits, setHasDeductedCredits] = useState(false);
  let a = JSON.parse(localStorage.getItem("userProfile"));
  let id = a?._id;

  useEffect(() => {
    axios
      .get(`${API}user/user-Profile/${userId}`)
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => console.error('Error fetching profile data:', error));

    axios.get(`${API}user/${id}`)
      .then((res) => {
        setCurrentUser(res.data.user.credits);
      });
  }, [userId]);

  const iconMap = {
    'उम्र': <FaBirthdayCake />,
    'लिंग': <FaVenusMars />,
    'ब्लड ग्रुप': <FaHeartbeat />,
    'शहर': <FaCity />,
    'कद': <GiBodyHeight />,
    'आहार': <FaUtensils />,
    'शौक': <FaUsers />,
    'वैवाहिक स्थिति': <GiLoveMystery />,
    'धर्म': <FaBalanceScale />,
    'जाति': <FaUsers />,
    'उप जाति': <FaUsers />,
    'मातृभाषा': <FaLanguage />,
    'मांगलिक': <FaBalanceScale />,
    'जहाँ पले-बढ़े': <FaMapMarkerAlt />,
    'स्वास्थ्य जानकारी': <GiHealthNormal />,
    'विकलांगता': <GiHealthNormal />,
    'गोत्र': <GiGothicCross />,
    'परिवार का विवरण': <GiFamilyTree />,
    'पिता': <FaUser />,
    'माता': <FaUser />,
    'परिवार का स्थान': <FaMapMarkerAlt />,
    'बहनों की संख्या': <FaUsers />,
    'भाइयों की संख्या': <FaUsers />,
    'पारिवारिक आर्थिक स्थिति': <FaMoneyBillWave />,
    'योग्यता': <FaUniversity />,
    'कॉलेज': <FaUniversity />,
    'कार्य': <FaBuilding />,
    'नियोक्ता': <FaBuilding />,
    'वार्षिक आय': <FaMoneyBillWave />,
    'कंपनी प्रकार': <FaBuilding />,
    'वर्तमान निवास': <FaHome />,
    'राज्य': <GiIndiaGate />,
    'निवास स्थिति': <FaHome />,
    'जन्म शहर': <FaCity />,
    'जन्म समय': <FaRegClock />,
    'पिन कोड': <FaMapMarkerAlt />,
    'भारत में निवास कब से': <GiIndiaGate />,
    'परिवार के साथ रहते हैं': <FaHome />
  };

  if (!profile) {
    return (
      <div className="text-center py-24 text-pink-600 text-xl font-semibold animate-pulse">
        प्रोफ़ाइल लोड हो रही है...
      </div>
    );
  }

  const gender = profile.userId?.gender;

  let bgGradient, borderColor, textColor, cardBg, cardBorder, buttonBg, backgroundImage;

  if (gender === "Female") {
    bgGradient = "bg-gradient-to-tr from-rose-100 via-pink-50 to-rose-200";
    borderColor = "border-rose-300";
    textColor = "text-pink-600";
    cardBg = "bg-rose-50 hover:bg-rose-100";
    cardBorder = "border-rose-200";
    buttonBg = "bg-pink-600 hover:bg-pink-700";
    backgroundImage = "url('/hearts-bg.svg')";
  } else if (gender === "Male") {
    bgGradient = "bg-gradient-to-tr from-blue-100 via-blue-50 to-blue-200";
    borderColor = "border-blue-300";
    textColor = "text-blue-600";
    cardBg = "bg-blue-50 hover:bg-blue-100";
    cardBorder = "border-blue-200";
    buttonBg = "bg-blue-600 hover:bg-blue-700";
    backgroundImage = "none";
  } else {
    bgGradient = "bg-gradient-to-tr from-yellow-100 via-yellow-50 to-yellow-200";
    borderColor = "border-yellow-400";
    textColor = "text-yellow-700";
    cardBg = "bg-yellow-50 hover:bg-yellow-100";
    cardBorder = "border-yellow-300";
    buttonBg = "bg-yellow-600 hover:bg-yellow-700";
    backgroundImage = "none";
  }

  return (
    <>
      <div className={`${bgGradient} bg-fixed bg-cover min-h-screen py-10 px-2`} style={{ backgroundImage }}>
        <ToastContainer />
        <div className={`max-w-6xl mx-auto bg-white/80 backdrop-blur-lg p-4 md:p-10 rounded-3xl border ${borderColor} shadow-xl space-y-10`}>
          <div className="flex flex-col items-center">
            <div className="w-full flex justify-between items-center">
              <button
                onClick={() => navigate(-1)}
                className={`px-5 py-2 ${buttonBg} cursor-pointer text-white rounded-full shadow-lg transition duration-300`}
              >
                ⬅ वापसी
              </button>

              <button
                onClick={() => navigate(`/plans`)}
                className={`flex items-center gap-2 px-5 py-2 cursor-pointer ${buttonBg} text-white rounded-full shadow-lg transition duration-300`}
              >
                <BsChatRightHeartFill />
                अभी जुड़ें
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center text-center space-y-4">
            <img
              src={profile.userId?.profileImage}
              alt="Profile"
              className={`w-44 h-44 object-cover rounded-full border-4 ${borderColor} shadow-xl hover:scale-105 transition duration-300`}
            />
            <h2 className={`text-4xl font-bold italic ${textColor}`}>
              {profile.userId?.firstName} {profile.userId?.lastName}
            </h2>
          </div>

          <div className="space-y-10">
            {[
              {
                title: '💖 व्यक्तिगत जानकारी',
                data: [
                  ['उम्र', profile.age],
                  ['लिंग', profile.userId?.gender],
                  ['ब्लड ग्रुप', profile.bloodgroup],
                  ['शहर', profile.city],
                  ['कद', profile.height],
                  ['आहार', profile.diet],
                  ['शौक', profile.hobbies],
                  ['वैवाहिक स्थिति', profile.maritalStatus],
                  ['धर्म', profile.religion],
                  ['जाति', profile.community],
                  ['उप जाति', profile.subCommunity],
                  ['मातृभाषा', profile.mothertongue],
                  ['मांगलिक', profile.manglik],
                  ['जहाँ पले-बढ़े', profile.growup],
                  ['स्वास्थ्य जानकारी', profile.healthinformation],
                  ['विकलांगता', profile.disability],
                  ['गोत्र', profile.gothram]
                ]
              },
              {
                title: '🏠 पारिवारिक जानकारी',
                data: [
                  ['परिवार का विवरण', profile.familydetail],
                  ['पिता', profile.fatherdetails],
                  ['माता', profile.motherdetails],
                  ['परिवार का स्थान', profile.familylocation],
                  ['बहनों की संख्या', profile.nosisters],
                  ['भाइयों की संख्या', profile.nobrothers],
                  ['पारिवारिक आर्थिक स्थिति', profile.familyfinancialstatus]
                ]
              },
              {
                title: '💼 पेशेवर जानकारी',
                data: [
                  ['योग्यता', profile.highestqualification],
                  ['कॉलेज', profile.collegesattended],
                  ['कार्य', profile.workingas],
                  ['नियोक्ता', profile.employername],
                  ['वार्षिक आय', profile.annualincome],
                  ['कंपनी प्रकार', profile.workingwith],
                  ['वर्तमान निवास', profile.currentresidence],
                  ['राज्य', profile.stateofresidence],
                  ['निवास स्थिति', profile.residencystatus]
                ]
              },
              {
                title: '📍 स्थान और संपर्क',
                data: [
                  ['जन्म शहर', profile.cityofbirth],
                  ['जन्म समय', profile.timeofbirth],
                  ['पिन कोड', profile.zippincode],
                  ['भारत में निवास कब से', profile.livingInIndiaSince],
                  ['परिवार के साथ रहते हैं', profile.liveWithFamily ? 'हाँ' : 'नहीं']
                ]
              }
            ].map((section, idx) => (
              <div
                key={idx}
                className={`bg-white/70 border ${cardBorder} p-5 rounded-2xl shadow-md hover:shadow-xl transition duration-300`}
              >
                <h3 className={`text-2xl font-bold ${textColor} mb-6 border-b pb-2`}>
                  {section.title}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-gray-800">
                  {section.data.map(([label, value], i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 ${cardBg} p-3 rounded-xl shadow-sm transition`}
                    >
                      <div className={`${textColor} text-xl`}>{iconMap[label]}</div>
                      <div className="text-sm">
                        <strong>{label}:</strong> {value || 'उपलब्ध नहीं'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileDetails;
