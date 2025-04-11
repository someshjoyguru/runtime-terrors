import express from 'express';
import * as dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });


export async function main(prompt) {
    const tmp = `List a few popular cookie recipes using this JSON schema:

    Recipe = {'recipeName': string}
    Return: Array<Recipe>`;

    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: tmp,
    });
    // console.log(typeof(response.text()));
    // const responseText = response;
    // console.log(responseText);
    
    // // Extract JSON from markdown code blocks if present
    // let jsonString = responseText;
    
    // // Check if response contains markdown code blocks
    // if (responseText.includes("```json")) {
    //     const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/);
    //     if (jsonMatch && jsonMatch[1]) {
    //         jsonString = jsonMatch[1].trim();
    //     }
    // }
    
    try {
      const jsonResponse = JSON.parse(jsonString);
      return response;
  } catch (error) {
      console.error("Failed to parse JSON:", error);
      // Return the raw text if parsing fails
      return { error: "Failed to parse JSON response", text: responseText };
  }
}

export const getWelcomeMessage = (req, res) => {
  res.status(200).json({ message: 'Welcome to the Gemini API!' });
};

export const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;
    const aiResponse = await main(prompt);
    res.status(200).json({ content: aiResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};