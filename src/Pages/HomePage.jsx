import React from 'react'
import FirstSection from '../Component/HomePage/FirstSection'
import SecondSection from '../Component/HomePage/SecondSection'
import ThirdSection from '../Component/HomePage/ThirdSection'
import FourthSection from '../Component/HomePage/FourthSection'
import Navbar from '../Component/Navbar/Navbar'

import Footer from '../Component/FooterPage/Footer'
import FifthSection from '../Component/HomePage/FifthSection'
import LegalMarriagePage from '../Component/HomePage/LegalMarriagePage'


function  HomePage() {
  return (
    <>
     
     <Navbar />
    <FirstSection />
    <SecondSection  />
    <ThirdSection />
    <FourthSection />
    {/* <FeesCharge /> */}
    <LegalMarriagePage />
    <FifthSection />
    
    <Footer />
        
    </>
  )
}

export default HomePage
