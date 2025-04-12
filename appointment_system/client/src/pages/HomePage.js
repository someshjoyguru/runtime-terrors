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
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-orange-600 mb-4">
              Healthcare Portal
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Connect with trusted healthcare professionals and manage your health documents
            </p>
          </div>

          {/* Doctors Section */}
          <div className="mb-12">
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-1 bg-orange-500 rounded-full"></div>
              <h2 className="text-2xl font-semibold text-gray-800 mx-4">
                Our Healthcare Professionals
              </h2>
              <div className="w-16 h-1 bg-orange-500 rounded-full"></div>
            </div>
            <Row gutter={[24, 24]} className="mb-6">
              {doctors?.map((doctor) => (
                <DoctorList doctor={doctor} key={doctor._id} />
              ))}
            </Row>
          </div>

          {/* Features Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 max-w-6xl mx-auto border border-orange-100">
            <h2 className="text-2xl md:text-3xl font-semibold text-orange-600 text-center mb-12">
              Mental Health Support & Document Processing
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Document Scanner Section */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <i className="fas fa-file-medical text-2xl text-orange-500"></i>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Document Scanner
                  </h3>
                </div>

                <div
                  className={`
                    relative border-2 border-dashed rounded-xl p-8 transition-all duration-300
                    text-center cursor-pointer hover:border-orange-400 hover:bg-orange-50
                    ${imageFile ? 'border-orange-400 bg-orange-50' : 'border-orange-200'}
                  `}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    handleImageUpload(e.dataTransfer.files[0]);
                  }}
                  onClick={() => document.getElementById("image-upload").click()}
                >
                  {!imageFile && !isExtracting && (
                    <div className="py-8">
                      <i className="fas fa-cloud-upload-alt text-5xl text-orange-400 mb-4"></i>
                      <p className="text-gray-700 font-medium mb-2">
                        Drag and drop or click to upload
                      </p>
                      <p className="text-sm text-orange-500">
                        Supported: PNG, JPG, JPEG
                      </p>
                    </div>
                  )}

                  {isExtracting && (
                    <div className="py-12">
                      <i className="fas fa-spinner fa-spin text-4xl text-orange-500 mb-4"></i>
                      <p className="text-orange-600 font-medium">
                        Processing your document...
                      </p>
                    </div>
                  )}

                  {imageFile && !isExtracting && (
                    <div className="space-y-4">
                      <img
                        src={URL.createObjectURL(imageFile)}
                        alt="Preview"
                        className="max-h-48 mx-auto rounded-lg shadow-md"
                      />
                      <p className="text-sm text-orange-600 flex items-center justify-center">
                        <i className="fas fa-exchange-alt mr-2"></i>
                        Click or drag to change document
                      </p>
                    </div>
                  )}
                </div>

                <input
                  type="file"
                  id="image-upload"
                  hidden
                  accept="image/png, image/jpeg"
                  onChange={(e) => e.target.files[0] && handleImageUpload(e.target.files[0])}
                />

                {ocrResult && (
                  <div className="mt-8 bg-orange-50 rounded-xl p-6 border border-orange-200">
                    <div className="flex items-center space-x-2 text-orange-600 mb-4">
                      <i className="fas fa-file-alt"></i>
                      <h4 className="font-semibold">Scan Results</h4>
                    </div>
                    <pre className="bg-white p-4 rounded-lg text-sm text-gray-700 overflow-auto max-h-64 border border-orange-100">
                      {JSON.stringify(ocrResult, null, 2)}
                    </pre>
                  </div>
                )}
              </div>

              {/* Mental Health Form Section */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <i className="fas fa-heart text-2xl text-orange-500"></i>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Mental Health Assessment
                  </h3>
                </div>
                <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                  <MentalHealthForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;