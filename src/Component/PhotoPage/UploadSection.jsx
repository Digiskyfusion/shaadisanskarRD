import React, { useState, useEffect } from 'react';
import ProfileThree from '../MyProfilePage/ProfileThree';
import axios from 'axios';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';

const UploadSection = () => {
  const [images, setImages] = useState([]);
  const [userImages, setUserImages] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem("userProfile"));
  const userId = user?._id;
  const API = import.meta.env.VITE_APP_API_URL;

  const fetchUserImages = async () => {
    try {
      const res = await axios.get(`${API}api/images`);
      const userEntry = res.data.find((entry) => entry.userId === userId);
      if (userEntry) {
        setUserImages(userEntry);
        setImages(userEntry.images);
      } else {
        setUserImages(null);
        setImages([]);
      }
    } catch (error) {
      console.error("छवियाँ लाने में त्रुटि:", error);
    }
  };

  useEffect(() => {
    if (userId) fetchUserImages();
  }, [userId]);

  const handleUpload = async (files) => {
    setError(null);
    if (!files.length) return;

    if ((images.length + files.length) > 5) {
      setError("आप अधिकतम 5 फ़ोटो अपलोड कर सकते हैं।");
      return;
    }

    for (const file of files) {
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        setError("केवल JPG, PNG, या WEBP फॉर्मेट ही स्वीकार्य हैं।");
        return;
      }
      if (file.size > 15 * 1024 * 1024) {
        setError("प्रत्येक फ़ोटो 15 MB से कम होना चाहिए।");
        return;
      }
    }

    setUploading(true);
    try {
      const urls = [];
      for (const file of files) {
        const fileRef = ref(storage, `uploads/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(fileRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        urls.push(downloadURL);
      }

      if (userImages) {
        const res = await axios.put(`${API}api/images/${userImages._id}`, {
          images: [...userImages.images, ...urls],
          title: userImages.title || "यूज़र फ़ोटो"
        });
        setUserImages(res.data.data);
        setImages(res.data.data.images);
      } else {
        if (urls.length < 3) {
          setError("कृपया कम से कम 3 फ़ोटो अपलोड करें।");
          setUploading(false);
          return;
        }
        const res = await axios.post(`${API}api/images`, {
          userId,
          images: urls,
        });
        setUserImages(res.data.data);
        setImages(res.data.data.images);
      }
    } catch (error) {
      console.error("अपलोड विफल:", error);
      setError("अपलोड विफल रहा, कृपया पुनः प्रयास करें।");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (urlToDelete) => {
    if (!userImages || !userImages._id) return;

    if (images.length <= 3) {
      setError("आपके प्रोफ़ाइल में कम से कम 3 फ़ोटो होनी चाहिए।");
      return;
    }

    try {
      const path = decodeURIComponent(new URL(urlToDelete).pathname.split("/o/")[1].split("?")[0]);
      const fileRef = ref(storage, path);
      await deleteObject(fileRef);

      const updatedImages = images.filter((url) => url !== urlToDelete);
      const res = await axios.put(`${API}api/images/${userImages._id}`, {
        images: updatedImages,
        title: userImages.title || "यूज़र फ़ोटो",
      });

      setImages(res.data.data.images);
      setUserImages(res.data.data);
      setError(null);
    } catch (error) {
      console.error("फ़ोटो हटाने में त्रुटि:", error);
      setError("फ़ोटो हटाने में विफल।");
    }
  };

  return (
    <>
      <div className='p-2 md:p-4 jost md:px-10 md:py-5'>
        <div className='bg-[#FFCCA8] py-2 md:py-3 md:px-5 rounded-md'>
          <div className='flex justify-center gap-3 mt-3'>
            <Link to="/setting">
              <button
                className={`px-5 py-1 bg-[#FF5A60] text-white cursor-pointer text-center rounded-full ${
                  uploading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={uploading}
              >
                {uploading ? "अपलोड हो रहा है..." : "सेटिंग"}
              </button>
            </Link>
          </div>

          <ProfileThree onUpload={handleUpload} uploading={uploading} />

          {error && (
            <p className="text-center text-red-600 font-semibold mt-2">{error}</p>
          )}

          <div className='md:w-3/4 lg:w-1/2 mx-auto'>
            <p className='text-center'>
              नोट: आप अपनी प्रोफ़ाइल में न्यूनतम 3 और अधिकतम 5 फ़ोटो अपलोड कर सकते हैं। प्रत्येक फ़ोटो 15 MB से कम होनी चाहिए और फॉर्मेट jpg, jpeg, png या webp में होनी चाहिए।
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h1 className="text-center text-2xl font-semibold gilda-display-regular mb-4">मेरी फ़ोटो</h1>
        <div className="flex justify-center gap-4 flex-wrap">
          {images.filter(Boolean).map((url, index) => (
            <div key={index} className="relative group w-24 h-24 sm:w-40 sm:h-40">
              <img
                src={url}
                alt={`फ़ोटो ${index + 1}`}
                title={`बड़ी करके देखने के लिए क्लिक करें`}
                onClick={() => setSelectedImage(url)}
                className="w-full h-full object-cover rounded-xl shadow-md cursor-pointer"
              />
              <button
                onClick={() => handleDelete(url)}
                title="फ़ोटो हटाएं"
                className="absolute top-1 right-1 bg-white text-red-600 border border-red-600 rounded-full p-1 text-sm hover:bg-red-600 hover:text-white transition-colors duration-200"
              >
                <MdDelete className='cursor-pointer' />
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 cursor-zoom-out"
        >
          <img
            src={selectedImage}
            alt="बड़ी फ़ोटो"
            className="max-w-full max-h-full rounded-lg shadow-lg"
          />
        </div>
      )}
    </>
  );
};

export default UploadSection;
