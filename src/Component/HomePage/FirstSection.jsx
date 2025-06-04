  import React from 'react';
  import theme from '../../assets/Images/theme.png'; // Background mandap image
  import couples from '../../assets/Images/couples.png';
  import group367 from '../../assets/Images/Group 367.png';
  import bgImage from '../../assets/Images/Group 369.png';
  // import groupphoto from '../../assets/Images/Group 407.png';
  import groupphoto from '../../assets/Images/header 2.png';

  function FirstSection() {
    return (
      <div
        className="relative w-full md:mt-10  mt-20 bg-cover bg-center"
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 " />

        {/* Group Photo */}
        <div className="relative z-20 flex justify-center items-center">
          <img
            src={groupphoto}
            alt="Group"
            className=" object-cover"
          />
        </div>

        {/* Bottom Content Box */}
        <div className="absolute bottom-0 w-full z-30">
          <div className="px-6 sm:px-10 pt-10 pb-2 lg:pb-8 text-center shadow-xl">
            <h2 className="text-[8px] md:text-[20px] lg:text-2xl xl:text-4xl xl:mb-9 font-semibold gilda-display text-gray-800">
              <span className="italic font-semibold text-gray-900">
                परंपरा और प्यार से बने खास रिश्ते

              </span>
            </h2>

            <p className="text-[5px] sm:text-base md:text-[10px] lg:text-[15px] xl:text-2xl xl:mb-4 text-gray-600  max-w-2xl mx-auto jost font-light">
             भारत का सबसे भरोसेमंद शादी का प्लेटफॉर्म — सच्चे, सांस्कृतिक और जीवनभर के रिश्तों के लिए।
            </p>

            <button className=" px-2 py-1 md:px-6 md:py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full shadow-md transition text-[5px] sm:text-base">
              
अपनी शुरुआत करें

            </button>
          </div>
        </div>
      </div>
    );
  }

  export default FirstSection;
