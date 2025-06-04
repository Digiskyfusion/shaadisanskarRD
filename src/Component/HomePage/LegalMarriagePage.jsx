import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { motion } from 'framer-motion';
// import marriageImage from '../../assets/Images/Rectangle 41.png';
import marriageImage from '../../assets/Images/Property 1=Default (2).png';

function LegalMarriagePage() {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center px-6 py-16">
      
      {/* टाइपिंग इफ़ेक्ट के साथ शीर्षक */}
      <h1 className="text-2xl sm:text-5xl font-extrabold text-[#C34040] mb-12 min-h-[3rem] text-center ">
        <Typewriter
          words={['ShaadiSanskar के साथ कानूनी विवाह अब आसान']}
          loop={1}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1500}
        />
      </h1>
      
      <div className=" w-full flex flex-col lg:flex-row items-center gap-16">
        
        {/* बाईं ओर - इमेज फेड-इन एनिमेशन के साथ */}
        <motion.div 
          className="lg:w-1/2 w-full"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <img
            src={marriageImage}
            alt="कानूनी विवाह चित्रण"
            className="w-full rounded-2xl shadow-xl object-cover max-h-[450px]"
            loading="lazy"
          />
        </motion.div>
        
        {/* दाईं ओर - कंटेंट फेड-इन एनिमेशन के साथ */}
        <motion.div 
          className="lg:w-1/2 w-full"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
        >
          <p className="text-lg text-gray-700 mb-10 max-w-xl leading-relaxed">
            ShaadiSanskar ने <strong>Vivah Sanskar Nagpur</strong> के साथ साझेदारी की है ताकि आपको कानूनी कोर्ट मैरिज और रजिस्ट्रेशन सेवाएं एक ही जगह पर मिल सकें।
          </p>

          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            हम क्या सेवा प्रदान करते हैं
          </h2>

          <ul className="space-y-5 text-lg text-gray-700 mb-12 max-w-xl">
            {[
              'स्पेशल मैरिज एक्ट के तहत रजिस्ट्रेशन',
              'आर्य समाज विवाह',
              'अंतर-जातीय / अंतर-धार्मिक विवाह',
              'सरकारी मान्यता प्राप्त कानूनी प्रमाण पत्र',
            ].map((item) => (
              <li key={item} className="flex items-center gap-4">
                <span className="text-green-600 text-2xl select-none">✔</span> {item}
              </li>
            ))}
          </ul>

          <div className=" ">
            <h3 className="text-2xl font-semibold text-[#C34040] mb-4">
              बिना तनाव, बिना देरी
            </h3>
            <p className="text-gray-700 mb-8 leading-relaxed">
              हम ShaadiSanskar पर मिले जोड़ों के लिए आसान और परेशानी मुक्त कानूनी विवाह सहायता प्रदान करते हैं।
            </p>
            {/* <button 
              onClick={() => alert('साइनअप/संपर्क पेज पर जा रहे हैं...')} 
              className="bg-[#C34040] text-white px-8 py-3 rounded-full font-semibold cursor-pointer transition duration-300 shadow-lg"
              aria-label="आज ही शुरुआत करें"
            >
              आज ही शुरुआत करें
            </button> */}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default LegalMarriagePage;
