import React from 'react';
import Navbar from '../Component/Navbar/Navbar';
import Navbar4 from '../Component/Navbar/Navbar4'; // assuming this exists
import GetMarriedOne from '../Component/GetMarriedPage/GetMarreiedOne';
import Footer from '../Component/FooterPage/Footer';
function GetMarriedPage() {
  const token = localStorage.getItem('token'); // check token from localStorage

  return (
    <>
      {token ? <Navbar4 /> : <Navbar />}
      <div className={token ? 'mt-0' : 'mt-25'}>
        <GetMarriedOne />
      </div>
      <Footer />
    </>
  );
}

export default GetMarriedPage;
