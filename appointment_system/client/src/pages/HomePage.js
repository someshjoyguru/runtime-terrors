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
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-center text-4xl font-bold text-orange-600 mb-8">
            Healthcare Portal
          </h1>

          {/* Doctors Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Our Healthcare Professionals
            </h2>
            <Row gutter={[24, 24]} className="mb-6">
              {doctors &&
                doctors.map((doctor) => (
                  <DoctorList doctor={doctor} key={doctor._id} />
                ))}
            </Row>
          </div>

          {/* Unified Container */}
          <div className="bg-white border border-orange-200 rounded-2xl p-8 max-w-6xl mx-auto shadow-lg">
            <h2 className="text-2xl font-semibold text-orange-700 mb-8 text-center">
              Mental Health Support & Document Processing
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Improved Image Upload Section */}
              <div className="w-full">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <i className="fas fa-file-medical text-orange-500 mr-2"></i>
                  Document Scanner
                </h3>
                <div
                  className={`relative border-3 border-dashed rounded-xl p-8 transition-all duration-300
                    ${
                      imageFile
                        ? "border-orange-400 bg-orange-50"
                        : "border-orange-200 hover:border-orange-400"
                    }
                    text-center cursor-pointer group hover:shadow-xl`}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files[0];
                    handleImageUpload(file);
                  }}
                  onClick={() => document.getElementById("image-upload").click()}
                >
                  {!imageFile && !isExtracting && (
                    <div className="flex flex-col items-center justify-center py-8">
                      <i className="fas fa-cloud-upload-alt text-4xl text-orange-400 group-hover:text-orange-500 mb-4 transition-colors"></i>
                      <p className="text-base font-medium text-gray-700 mb-2">
                        Drag and drop or click to upload
                      </p>
                      <p className="text-sm text-orange-500">
                        Supported: PNG, JPG, JPEG
                      </p>
                    </div>
                  )}

                  {isExtracting && (
                    <div className="py-12">
                      <i className="fas fa-spinner fa-spin text-3xl text-orange-500 mb-4"></i>
                      <p className="text-orange-600 font-medium">
                        Processing your document...
                      </p>
                    </div>
                  )}

                  {imageFile && !isExtracting && (
                    <div className="flex flex-col items-center">
                      <img
                        src={URL.createObjectURL(imageFile)}
                        alt="Uploaded preview"
                        className="max-h-48 rounded-lg shadow-lg mb-4 object-contain border border-orange-100"
                      />
                      <p className="text-sm text-orange-700 flex items-center">
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
                  onChange={(e) =>
                    e.target.files[0] && handleImageUpload(e.target.files[0])
                  }
                />

                {ocrResult && (
                  <div className="mt-6 bg-orange-50 p-6 rounded-xl border border-orange-200 shadow-sm">
                    <h4 className="font-semibold mb-3 flex items-center text-orange-700">
                      <i className="fas fa-file-alt mr-2"></i>
                      Scan Results
                    </h4>
                    <pre className="bg-white p-4 rounded-lg text-sm text-gray-700 overflow-auto max-h-64 border border-orange-100">
                      {JSON.stringify(ocrResult, null, 2)}
                    </pre>
                  </div>
                )}
              </div>

              {/* Mental Health Form Section */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <i className="fas fa-heart text-orange-500 mr-2"></i>
                  Mental Health Assessment
                </h3>
                <div className="bg-orange-50 rounded-xl p-6 shadow-sm border border-orange-200">
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