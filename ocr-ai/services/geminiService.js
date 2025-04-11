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
