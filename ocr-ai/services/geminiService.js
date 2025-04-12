import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

export const extractInfoFromText= async (ocrText) => {
  const prompt = `

  You are an intelligent assistant that returns only valid JSON.
     extractInfoFromText
  The following text was extracted from patient report. Extract structured data with the all the possible keys.
  
  
  
  Respond with only valid JSON. Do not include the word 'json', triple backticks, or any extra formatting.
  
  Text:
  ${ocrText}
  `;
  

  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });

  const data = await res.json();
  console.log(data?.candidates?.[0]?.content?.parts?.[0]?.text)
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || null;
}


export const predictDepression = async (formData) => {
  const prompt = `

  You are an intelligent assistant that returns only valid JSON.
     predictDepression
  The following data was received from patient based on a questionaire.
  Age: 1-110
  Gender: Male, Female, Others
  Profession: Student, Employed, Unemployed, Other
  Academic Performance(GPA/CGPA if applicable): 0-10
  Financial Status: Poor, Average, Good, Excellent
  Work/ Academic Pressure: 1-10
  Sleep Quality: 1-10
  Physical Actuvity Level: None, Low, Moderate, High
  Relationship Status: Single, In a relationship, Married, Divorced, Widowed
  Daily social media Usage((hours): 0-24
  Family Support: 1-10
  Friends support: 1-10
  
  Predict whether the person is in depression or not and suggest remedies or necessary habitual changes. Use structured data with the all the possible keys.
  - depression: boolean
  - remedies: string[]
  - habits: string[]
  
  Always ensure to include the keys "depression", "remedies", and "habits" in your response.
  Respond with only valid JSON. Do not include the word 'json', triple backticks, or any extra formatting.
  
  Here is the data:
  ${formData}
  `;
  

  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });

  const data = await res.json();
  console.log(data?.candidates?.[0]?.content?.parts?.[0]?.text)
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || null;
}
