import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import { Row, message } from "antd";
import DoctorList from "../components/DoctorList";
import MentalHealthForm from "../pages/MentalHealthForm";

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);
  // Image upload state
  const [imageFile, setImageFile] = useState(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [ocrResult, setOcrResult] = useState(null);
  const [userId, setUserId] = useState(null);

  // login user data
  const getUserData = async () => {
    try {
      // First get all doctors
      const res = await axios.get(
        "/api/v1/user/getAllDoctors",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
      
      // Then get current user info to get userId
      const userRes = await axios.get("/api/v1/user/getUserInfo", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      
      if (userRes.data.success) {
        setUserId(userRes.data.data._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  // Image processing function
  const fetchDataFromImage = async (file) => {
    setIsExtracting(true);
    setOcrResult(null);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post('http://localhost:8000/api/ocr/process', formData);
      setOcrResult(response.data);
      
      // Save OCR result to user profile if we have userId and successful OCR result
      if (userId && response.data && response.data.success) {
        await saveOcrToUserProfile(response.data);
      }
    } catch (error) {
      console.error('OCR error:', error);
      setOcrResult({ error: 'Failed to extract info from image.' });
    } finally {
      setIsExtracting(false);
    }
  };

  // Save OCR result to user profile
  const saveOcrToUserProfile = async (ocrData) => {
    try {
      const response = await axios.post(
        "/api/v1/user/save-ocr-result",
        {
          userId: userId,
          ocrResult: ocrData.extractedData,
          imageUrl: ocrData.imageUrl,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      
      if (response.data.success) {
        message.success("OCR result saved to your profile");
      }
    } catch (error) {
      console.error("Error saving OCR result:", error);
      message.error("Failed to save OCR result to your profile");
    }
  };

  const handleImageUpload = async (file) => {
    setImageFile(file);
    fetchDataFromImage(file);
  };

  return (
    <Layout>
      <h1 className="text-center">Home Page</h1>
      <Row>
        {doctors && doctors.map((doctor) => <DoctorList doctor={doctor} key={doctor._id} />)}
      </Row>
      
      {/* Image Upload Section */}
      <div className="mt-8 mb-6">
        <h3 className="text-xl font-semibold mb-4">Upload Image for Processing</h3>
        <div
          className={`border-2 border-dashed rounded-lg p-6 ${imageFile ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-blue-400'} text-center cursor-pointer`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            handleImageUpload(file);
          }}
          onClick={() => document.getElementById('image-upload').click()}
        >
          {isExtracting ? (
            <p className="text-blue-600 font-medium">Extracting image info...</p>
          ) : imageFile ? (
            <>
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Uploaded"
                className="max-h-40 mx-auto mb-4 rounded"
              />
              <p className="text-sm text-gray-600">Click or drag to change image</p>
            </>
          ) : (
            <p className="text-sm text-gray-600">Click or drag to upload an image</p>
          )}
        </div>
        <input
          type="file"
          id="image-upload"
          hidden
          onChange={(e) => e.target.files[0] && handleImageUpload(e.target.files[0])}
        />
      </div>

      {ocrResult && (
        <div className="mt-4 bg-gray-100 p-4 rounded-md text-sm text-gray-800 whitespace-pre-wrap mb-6">
          <h3 className="text-md font-semibold mb-2">Processing Result:</h3>
          <pre>{JSON.stringify(ocrResult, null, 2)}</pre>
        </div>
      )}
      
      { <MentalHealthForm /> }
    </Layout>
  );
};

export default HomePage;