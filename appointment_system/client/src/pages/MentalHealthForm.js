import React, { useState } from 'react';
// import './MentalHealthForm.css'; // Assuming you'll create a CSS file

const MentalHealthForm = () => {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    profession: '',
    cgpa: '',
    financialStatus: '',
    workPressure: '',
    jobSatisfaction: '',
    academicPressure: '',
    studySatisfaction: '',
    socialMedia: '',
    relationshipStatus: '',
    sleepQuality: '',
    physicalActivity: '',
    familySupport: '',
    friendsSupport: '',
    substanceUse: ''
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error('Error during prediction:', error);
      setPrediction('Error occurred during prediction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mental-health-container">
      <h1>Mental Health Assessment</h1>
      <p className="form-description">
        Complete this form to receive an assessment based on our depression prediction model.
        All information is kept private and confidential.
      </p>
      
      <form onSubmit={handleSubmit} className="mental-health-form">
        <div className="form-section">
          <h2>Demographic Information</h2>
          
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              min="12"
              max="100"
            />
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="profession">Profession:</label>
            <select
              id="profession"
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              required
            >
              <option value="">Select Profession</option>
              <option value="student">Student</option>
              <option value="employed">Employed</option>
              <option value="unemployed">Unemployed</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="form-section">
          <h2>Academic & Financial Factors</h2>
          
          <div className="form-group">
            <label htmlFor="cgpa">Academic Performance (GPA/CGPA if applicable):</label>
            <input
              type="number"
              id="cgpa"
              name="cgpa"
              value={formData.cgpa}
              onChange={handleChange}
              min="0"
              max="10"
              step="0.1"
              placeholder="Leave blank if not applicable"
            />
          </div>

          <div className="form-group">
            <label htmlFor="financialStatus">Financial Status:</label>
            <select
              id="financialStatus"
              name="financialStatus"
              value={formData.financialStatus}
              onChange={handleChange}
              required
            >
              <option value="">Select Financial Status</option>
              <option value="poor">Poor</option>
              <option value="average">Average</option>
              <option value="good">Good</option>
              <option value="excellent">Excellent</option>
            </select>
          </div>
        </div>

        <div className="form-section">
          <h2>Lifestyle & Wellbeing</h2>
          
          <div className="form-group">
            <label htmlFor="workPressure">Work/Academic Pressure (1-10):</label>
            <input
              type="range"
              id="workPressure"
              name="workPressure"
              value={formData.workPressure}
              onChange={handleChange}
              min="1"
              max="10"
              required
            />
            <div className="range-value">{formData.workPressure || 5}</div>
          </div>

          <div className="form-group">
            <label htmlFor="sleepQuality">Sleep Quality (1-10):</label>
            <input
              type="range"
              id="sleepQuality"
              name="sleepQuality"
              value={formData.sleepQuality}
              onChange={handleChange}
              min="1"
              max="10"
              required
            />
            <div className="range-value">{formData.sleepQuality || 5}</div>
          </div>

          <div className="form-group">
            <label htmlFor="physicalActivity">Physical Activity Level:</label>
            <select
              id="physicalActivity"
              name="physicalActivity"
              value={formData.physicalActivity}
              onChange={handleChange}
              required
            >
              <option value="">Select Activity Level</option>
              <option value="none">None</option>
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div className="form-section">
          <h2>Social & Support Systems</h2>
          
          <div className="form-group">
            <label htmlFor="relationshipStatus">Relationship Status:</label>
            <select
              id="relationshipStatus"
              name="relationshipStatus"
              value={formData.relationshipStatus}
              onChange={handleChange}
              required
            >
              <option value="">Select Status</option>
              <option value="single">Single</option>
              <option value="relationship">In a Relationship</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
              <option value="widowed">Widowed</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="socialMedia">Daily Social Media Usage (hours):</label>
            <input
              type="number"
              id="socialMedia"
              name="socialMedia"
              value={formData.socialMedia}
              onChange={handleChange}
              min="0"
              max="24"
              step="0.5"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="familySupport">Family Support (1-10):</label>
            <input
              type="range"
              id="familySupport"
              name="familySupport"
              value={formData.familySupport}
              onChange={handleChange}
              min="1"
              max="10"
              required
            />
            <div className="range-value">{formData.familySupport || 5}</div>
          </div>

          <div className="form-group">
            <label htmlFor="friendsSupport">Friends Support (1-10):</label>
            <input
              type="range"
              id="friendsSupport"
              name="friendsSupport"
              value={formData.friendsSupport}
              onChange={handleChange}
              min="1"
              max="10"
              required
            />
            <div className="range-value">{formData.friendsSupport || 5}</div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Processing...' : 'Get Assessment'}
          </button>
        </div>
      </form>

      {prediction && (
        <div className="prediction-result">
          <h2>Assessment Result</h2>
          <div className="result-box">
            <p>Based on your inputs, our model indicates:</p>
            <p className="prediction">{prediction}</p>
            <p className="disclaimer">
              Note: This is not a clinical diagnosis. Please consult with a healthcare professional 
              for proper evaluation and support.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentalHealthForm;
