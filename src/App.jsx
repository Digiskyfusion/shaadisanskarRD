import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import HomePage from "./Pages/HomePage";
import LoginNavbarPage from "./Pages/LoginNavbarPage";
import StepOne from "./Component/FormPage/StepOne";
import StepTwo from "./Component/FormPage/StepTwo";
import VerifyOtp from "./Component/FormPage/VerifyOtp";
import CardsPage from "./Pages/CardsPage";
import DashBoardPage from "./Pages/DashBoardPage";
import ProfilePage from "./Pages/ProfilePage";
import UploadPage from "./Pages/UploadPage";
import PhotoSetting from "./Pages/PhotoSetting";
import SettingPage from "./Pages/SettingPage";
import DeletePage from "./Pages/DeletePage";
import ConfirmPage from "./Pages/ConfirmPage";
import ProfileDeletePage from "./Pages/ProfileDeletePage";
import DeleteOtpPage from "./Pages/DeleteOtpPage";
import ProfileSubmitPage from "./Pages/ProfileSubmitPage";
import ProfileFull from "./Component/MyProfilePage/ProfileFull";
import FirstProfilePage from "./Pages/FirstProfilePage";
import ThirdProfilePage from "./Pages/ThirdProfilePage";
import FifthProfilePage from "./Pages/FifthProfilePage";
import FourthProfilePage from "./Pages/FourthProfilePage";
import SixthProfilePage from "./Pages/SixthProfilePage";
import AllProfilePage from "./Pages/AllProfilePage";
import SecondProfilePage from "./Pages/SecondProfilePage";
import TodayProfilePage from "./Pages/TodayProfilePage";
import NewMatchesPage from "./Pages/NewMatchesPage";
import SecondMatchPage from "./Pages/SecondMatchPage";
import ForgetPasswordPage from "./Pages/ForgetPasswordPage";
import ResetPasswordPage from './Pages/ResetPasswordPage';
import AboutUsPage from "./Pages/AboutUsPage";
import BlogPage from "./Pages/BlogPage";
import SecondpageBlogs from "./Pages/SecondpageBlogs";
import ProfilesDetailsPage from "./Pages/ProfilesDetailsPage";
import ContactUsPage from "./Pages/ContactUsPage";
import ChatPage from "./Pages/ChatPage";
import PlanPageFull from "./Pages/PlanPageFull";
import ScrollToTop from "./Component/ScrollTop/ScrollToTop";
import UserReceiptPage from "./Pages/UserReceiptPage";
import { initializeSocket } from "./utils/socket";
import TermAndConditionPage from "./Pages/TermAndConditionPage";
import PrivacyAndPolicyPage from "./Pages/PrivacyAndPolicyPage";
import CancelAndRefundPage from "./Pages/CancelAndRefundPage";
import GetMarriedPage from "./Pages/GetMarriedPage";



function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    profileFor: "",
    firstName: "",
    lastName: "",
    gender: "",
    mobileNumber: "",
    emailId: "",
    dob: "",
    location: "",
    password: "",
  });


   useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const socket = initializeSocket(token);

      socket.on("receive_message", (message) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const currentPath = window.location.pathname;

        const isChatOpen = currentPath.includes(`/chat/${message.senderId}`);

        if (!isChatOpen && user?._id !== message.senderId) { // Ensure the message isn't from yourself
          // toast.success(`📨 New message from ${message.senderName || 'someone'}`);
        }
      });

      return () => {
        socket.off("receive_message");
      };
    }
  }, []);

  return (
    <>
    <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/register/step-one"
          element={<StepOne formData={formData} setFormData={setFormData} />}
        />
        <Route
          path="/register/step-two"
          element={<StepTwo formData={formData} setFormData={setFormData} />}
        />
        <Route path="/StepThree" element={<ProfileSubmitPage />} />
        <Route path="/verifyOtp" element={<VerifyOtp />} />
        <Route path="/login" element={<LoginNavbarPage />} />
        <Route path="/CardsPage" element={<CardsPage />} />
        <Route path="/dashboard" element={<DashBoardPage />} />
        <Route path="/profile" element={<ProfileFull />} />
        <Route path="/userprofile" element={<ProfilePage />} />
        <Route path="/photo" element={<UploadPage />} />
        <Route path="/photosetting" element={<PhotoSetting />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/delete" element={<DeletePage />} />
        <Route path="/confirm" element={<ConfirmPage />} />
        <Route path="/profiledelete" element={<ProfileDeletePage />} />
        <Route path="/deleteotp" element={<DeleteOtpPage />} />
        {/* <Route path="/multifrom" element={<MultiStepForm />} /> */}
        <Route path='/firstProfile' element={<FirstProfilePage /> }/>
        <Route path='/SecondProfile' element={<SecondProfilePage />}/>
        <Route path='/thirdProfile' element={<ThirdProfilePage /> }/>
        <Route path='/fourthProfile' element={<FourthProfilePage /> }/>
        <Route path='/fifthProfile' element={<FifthProfilePage/> }/>
        <Route path='/sixthProfile' element={<SixthProfilePage/> }/>
        <Route path='/fifthProfile' element={<FifthProfilePage /> }/>
        <Route path='/sixthProfile' element={<SixthProfilePage /> }/>
        <Route path='/FirstMatch' element={<TodayProfilePage /> }/>
        <Route path='/secondmatch' element={<SecondMatchPage /> }/> 
        <Route path='/newmatch' element={<NewMatchesPage /> }/>
        <Route path="/profile/:userId" element={<ProfilesDetailsPage />} />
        {/* <Route path="/profile/:userId" element={<ConnectreistrationProfilePage />} /> */}
        <Route path="/allprofile" element={<AllProfilePage />} />
        <Route path="/forget-password" element={<ForgetPasswordPage  />} />
        <Route path="/reset-password" element={<ResetPasswordPage  />} />
        <Route path="/aboutus" element={<AboutUsPage  />} />
        <Route path="/blog" element={<BlogPage  />} />
        <Route path="/seocd" element={<SecondpageBlogs  />} />
        <Route path="/contactUs" element={<ContactUsPage  />} />
        <Route path="/Chat/:id" element={<ChatPage  />} />
        <Route path="/Chat" element={<ChatPage  />} />
        <Route path="/plans" element={<PlanPageFull  />} />
        <Route path="/termandcondition" element={<TermAndConditionPage />} />
        <Route path="/privacy" element={<PrivacyAndPolicyPage  />} />
        <Route path="/refund" element={<CancelAndRefundPage />} />
        <Route path="/userReceipts" element={<UserReceiptPage  />} />
        <Route path="/getmarrigeone" element={<GetMarriedPage  />} />
        
        
        
      </Routes>
     
   


    </>
    
  );
}




export default App;
