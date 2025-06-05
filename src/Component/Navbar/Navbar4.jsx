import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaHeart, FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Logo2 from '../../assets/Images/Shaadi Sanskar 2.png';

function Navbar4() {
    const navigate = useNavigate();
    const location = useLocation();

    const [activeTopNav, setActiveTopNav] = useState('');
    const [activeBottomNav, setActiveBottomNav] = useState('');
    const [animate, setAnimate] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const triggerHeartAnimation = () => {
        setAnimate(true);
        setTimeout(() => {
            setAnimate(false);
        }, 600);
    };

    const handleBottomNavClick = (path, label) => {
        setActiveBottomNav(label);
        triggerHeartAnimation();
        setTimeout(() => {
            navigate(path);
        }, 600);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const bottomNavItems = {
        'मेरी शादी': [
            { label: 'डैशबोर्ड', path: '/dashboard' },
            { label: 'मेरी प्रोफ़ाइल', path: '/userprofile' },
            { label: 'मेरी फ़ोटो', path: '/photo' },
            { label: 'सेटिंग्स', path: '/setting' },
        ],
        'मेल-जोल': [
            { label: 'मेरे नज़दीक', path: '/secondmatch' },
            { label: 'सभी प्रोफाइल', path: '/allprofile' },
        ],
        'योजनाएं': [
            // { label: 'संदेश', path: '/Chat' },
            { label: 'योजनाएं', path: '/plans' },
            { label: 'रसीद', path: '/userReceipts' },
        ],
         'शादी करना': [
            { label: 'शादी करना', path: '/getmarrigeone' },
            
        ],
    };

    useEffect(() => {
        for (const [topNav, items] of Object.entries(bottomNavItems)) {
            for (const item of items) {
                if (location.pathname.startsWith(item.path)) {
                    setActiveTopNav(topNav);
                    setActiveBottomNav(item.label);
                    return;
                }
            }
        }
    }, [location.pathname]);

    const handleTopNavClick = (item) => {
        if (activeTopNav === item) {
            setActiveTopNav('');
        } else {
            setActiveTopNav(item);
        }
    };

    return (
        <div className='sticky top-0 jost z-50'>
            <div className="flex flex-col items-center bg-white relative">
                <div className="w-full flex flex-col items-center shadow-md bg-gradient-to-b from-[#FFCCA8]">
                    
                    {/* ऊपरी नेवबार */}
                    <div className="w-full flex flex-col md:flex-row items-center justify-between px-6 py-4">
                        <div className="flex items-center justify-between w-full md:w-auto">
                            <Link to="/dashboard">
                                <img src={Logo2} alt="Logo2" className="w-22 h-15" />
                            </Link>
                            <div className="md:hidden text-black" onClick={toggleMobileMenu}>
                                {mobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
                            </div>
                        </div>

                        {/* डेस्कटॉप टॉप नेव */}
                        <div className="hidden md:flex justify-center gap-6 text-black font-semibold">
                            {Object.keys(bottomNavItems).map((item) => (
                                <h1
                                    key={item}
                                    className={`cursor-pointer hover:text-[#EB5757] ${activeTopNav === item ? 'text-[#EB5757]' : ''}`}
                                    onClick={() => handleTopNavClick(item)}
                                >
                                    {item}
                                </h1>
                            ))}
                        </div>

                        {/* डेस्कटॉप बटन */}
                        <div className="hidden md:flex items-center gap-3">
                            <button
                                onClick={() => {
                                    localStorage.clear();
                                    navigate('/login');
                                }}
                                className="text-white bg-red-700 cursor-pointer rounded-lg px-5 py-2"
                            >
                                लॉगआउट
                            </button>
                        </div>
                    </div>

                    {/* मोबाइल मेन्यू ड्रॉपडाउन */}
                    {mobileMenuOpen && (
                        <div className="flex flex-col md:hidden gap-4 px-6 pb-4 text-[#5c2c12] font-semibold bg-[#FFCCA8] w-full">
                            {Object.keys(bottomNavItems).map((item) => (
                                <h1
                                    key={item}
                                    className={`cursor-pointer hover:text-[#EB5757] ${activeTopNav === item ? 'text-[#EB5757]' : ''}`}
                                    onClick={() => {
                                        handleTopNavClick(item);
                                        setMobileMenuOpen(false);
                                    }}
                                >
                                    {item}
                                </h1>
                            ))}
                            <button
                                onClick={() => {
                                    localStorage.clear();
                                    navigate('/login');
                                }}
                                className="text-white bg-red-700 cursor-pointer rounded-lg px-5 py-2"
                            >
                                लॉगआउट
                            </button>
                        </div>
                    )}

                    {/* निचला नेवबार */}
                    {activeTopNav && bottomNavItems[activeTopNav] && (
                        <div className="w-full flex flex-col items-center py-2 shadow-inner gap-2 bg-[#FF5A60] transition-all duration-300">
                            <div className="flex justify-center gap-6 lg:gap-16 text-white text-sm md:text-lg font-medium px-4">
                                {bottomNavItems[activeTopNav].map((item) => (
                                    <div key={item.label} className="flex flex-col items-center">
                                        <div className="h-4 mb-0.5 flex items-center justify-center">
                                            {activeBottomNav === item.label ? (
                                                <FaHeart className={`text-white h-4 w-4 transition-all duration-300 ${animate ? 'scale-125' : ''}`} />
                                            ) : (
                                                <div className="h-4 w-4" />
                                            )}
                                        </div>
                                        <h1
                                            className={`cursor-pointer hover:text-yellow-200 ${activeBottomNav === item.label ? 'underline' : ''}`}
                                            onClick={() => handleBottomNavClick(item.path, item.label)}
                                        >
                                            {item.label}
                                        </h1>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar4;
