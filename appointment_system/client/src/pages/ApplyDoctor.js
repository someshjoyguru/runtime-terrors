import React, { useState } from "react";
import Layout from "./../components/Layout";
import { Col, Form, Input, Row, TimePicker, message, Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import moment from "moment";

const ApplyDoctor = () => {
  const [form] = Form.useForm();
  const { user } = useSelector((state) => state.user);
  const [documentUrl, setDocumentUrl] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [ocrResult, setOcrResult] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //handle form
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/apply-doctor",
        {
          ...values,
          userId: user._id,
          timings: [
            moment(values.timings[0]).format("HH:mm"),
            moment(values.timings[1]).format("HH:mm"),
          ],
          supporting_documents: documentUrl
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Somthing Went Wrrong ");
    }
  };

  const handleFileUpload = async (info) => {
    if (info.file.status === 'uploading') {
      setIsExtracting(true);
      return;
    }
    if (info.file.status === 'done') {
      try {
        const formData = new FormData();
        formData.append('file', info.file.originFileObj);

        const response = await axios.post(
          'http://localhost:8000/api/ocr/fileupload',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (response.data.success) {
          setDocumentUrl(response.data.url);
          message.success('Document uploaded successfully!');
          form.setFieldsValue({ supporting_documents: response.data.url });
        }
      } catch (error) {
        message.error('Error uploading document');
        console.error(error);
      } finally {
        setIsExtracting(false);
      }
    }
  };

  return (
    <Layout>
      <h1 className="text-center">Apply Doctor</h1>
      <Form 
        form={form}
        layout="vertical" 
        onFinish={handleFinish} 
        className="m-3"
      >
        <h4 className="">Personal Details : </h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="First Name"
              name="firstName"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your first name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Last Name"
              name="lastName"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your last name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Phone No"
              name="phone"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your contact no" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Email"
              name="email"
              required
              rules={[{ required: true }]}
            >
              <Input type="email" placeholder="your email address" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Website" name="website">
              <Input type="text" placeholder="your website" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Address"
              name="address"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your clinic address" />
            </Form.Item>
          </Col>
        </Row>
        <h4>Professional Details :</h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Specialization"
              name="specialization"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your specialization" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Experience"
              name="experience"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your experience" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Fees Per Cunsaltation"
              name="feesPerCunsaltation"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your contact no" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Timings" name="timings" required>
              <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Supporting Documents"
              name="supporting_documents"
              required
              rules={[{ required: true, message: 'Please upload your supporting documents' }]}
            >
              <div className="space-y-4">
                <Upload
                  maxCount={1}
                  customRequest={({ file, onSuccess }) => {
                    onSuccess('ok');
                  }}
                  onChange={handleFileUpload}
                  accept=".jpg,.jpeg,.png,.pdf"
                  showUploadList={{ showDownloadIcon: true, showRemoveIcon: true }}
                >
                  <button type="button" className={`btn btn-primary ${isExtracting ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isExtracting}>
                    {isExtracting ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <UploadOutlined /> Click to Upload
                      </>
                    )}
                  </button>
                </Upload>

                {documentUrl && (
                  <div className="mt-2">
                    {documentUrl.match(/\.(jpg|jpeg|png)$/) ? (
                      <img src={documentUrl} alt="Document preview" style={{ maxWidth: '200px' }} className="rounded-lg shadow-md" />
                    ) : (
                      <a href={documentUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                        View Document
                      </a>
                    )}
                  </div>
                )}
              </div>
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <button className="btn btn-primary form-btn" type="submit">
              Submit
            </button>
          </Col>
        </Row>
      </Form>
    </Layout>
  );
};

export default ApplyDoctor;