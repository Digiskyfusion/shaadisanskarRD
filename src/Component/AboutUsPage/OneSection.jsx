import React from 'react';
import emoji from '../../assets/Images/Untitled-1 2.png';

function OneSection({ name }) {
  return (
    <div className="relative w-full flex flex-col sm:flex-row justify-center items-center bg-[#FF3540] py-10 sm:py-16 md:mt-10 mt-20">
      {/* Background/Image */}
      <img 
        src={emoji} 
        alt="emoji" 
        className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 object-cover mb-4 sm:mb-0 sm:mr-6" 
      />

      {/* Responsive Text */}
      <p className="text-center sm:text-left text-[20px] sm:text-[25px] md:text-[40px] lg:text-[45px] font-medium text-white tracking-widest">
        {name}
      </p>
    </div>
  );
}

export default OneSection;
