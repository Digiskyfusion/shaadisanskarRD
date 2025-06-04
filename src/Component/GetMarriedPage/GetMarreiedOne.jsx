import React from 'react';
import Image4 from '../../assets/Images/Image4.png';
import { FaCheckCircle } from 'react-icons/fa';
import { Typewriter } from 'react-simple-typewriter';

function GetMarriedOne() {
  const headingText = 'आपकी कानूनी शादी, ShaadiSanskar द्वारा सरल बनाई गई।';

  return (
    <div className="w-full p-8 bg-gradient-to-r from-green-100 via-green-50 to-white rounded-xl shadow-xl animate-fadeIn">
      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* Image Section */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={Image4}
            alt="Couple getting married"
            className="rounded-md shadow-2xl object-cover w-full transform hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Text Content */}
        <div className="md:w-1/2 space-y-6 px-4 md:px-0">
          <h1 className="text-4xl font-extrabold text-[#C34040] leading-tight drop-shadow-md">
            <Typewriter
              words={[headingText]}
              loop={1}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </h1>

          <p className="text-gray-700 text-lg leading-relaxed">
            ShaadiSanskar को गर्व है कि वह{' '}
            <strong className="text-[#C34040]">Vivah Sanskar Nagpur</strong> के साथ जुड़ा हुआ है — नागपुर और आसपास के क्षेत्रों में कानूनी कोर्ट मैरिज और विवाह पंजीकरण सेवाओं के लिए एक विश्वसनीय प्लेटफ़ॉर्म।
            अब, ShaadiSanskar पर मिलने वाले जोड़े आसानी से एक परेशानी-मुक्त कानूनी विवाह प्रक्रिया को पूरा कर सकते हैं, जिसमें शामिल हैं:
          </p>

          <ul className="space-y-3 text-gray-800 text-lg">
            {[
              'विशेष विवाह अधिनियम के तहत पंजीकरण',
              'आर्य समाज विवाह',
              'अंतर-जातीय / अंतर-धार्मिक विवाह',
              'सरकार द्वारा मान्यता प्राप्त कानूनी प्रमाणपत्र',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <FaCheckCircle className="text-[#C34040] text-xl flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <a
              href="https://www.vivahsanskarnagpur.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 text-black border-2 hover:text-white border-[#C34040] hover:bg-[#C34040] rounded-lg shadow-lg font-semibold text-center transition"
            >
              विवाह संस्कार नागपुर पर जाएं
            </a>
            <a
              href="https://www.shaadisanskar.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 text-black border-2 border-[#C34040] rounded-lg font-semibold text-center hover:bg-[#C34040] hover:text-white transition"
            >
              ShaadiSanskar पर जाएं
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetMarriedOne;
