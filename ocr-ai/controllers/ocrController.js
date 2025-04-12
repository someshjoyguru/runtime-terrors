import { extractTextFromImage } from '../services/ocrService.js';
import { extractInfoFromText, predictDepression } from '../services/geminiService.js';
import { uploadToCloudinary } from "../utils/cloudinary.js";
import sharp from "sharp";

export const processImage = async (req, res) => {
  try {
    console.log("📥 Incoming Body:", req.body);

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Optimize Image
    const optimizedImageBuffer = await sharp(req.file.buffer)
      .resize({ width: 800, height: 800, fit: "inside" })
      .toFormat("jpeg", { quality: 80 })
      .toBuffer();

    const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString("base64")}`;

    // Upload to Cloudinary
    const cloudResponse = await uploadToCloudinary(fileUri);
    const imageUrl = cloudResponse.secure_url;

    // OCR and Data Extraction
    const text = await extractTextFromImage(imageUrl);
    let extractedData = await extractInfoFromText(text);

    if (extractedData && typeof extractedData === 'string') {
      // Clean and Parse JSON Response
      const cleaned = extractedData
        .replace(/```json|```/gi, '')  // Remove markdown JSON formatting
        .trim();

      try {
        extractedData = JSON.parse(cleaned);
      } catch (err) {
        console.error("❌ JSON parse error:", err);
        return res.status(500).json({ error: "Failed to parse Gemini response." });
      }
    } else {
      console.warn("⚠ Gemini response was empty or malformed:", extractedData);
      return res.status(500).json({ error: "Invalid response from Gemini service." });
    }

    console.log('📄 Extracted data:', extractedData);
    
    // Return the extracted data directly without saving to database
    res.json({ 
      success: true, 
      extractedData,
      imageUrl
    });

  } catch (err) {
    console.error("❌ OCR Controller Error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const processReq = async (req, res) => {
  try {
    console.log("📥 Incoming Body:", req.body);

    const formData = req.body;
    if (!formData) {
      return res.status(400).json({ message: "formData is required" });
    }

    // Data Extraction
    let extractedData = await predictDepression(formData);

    if (extractedData && typeof extractedData === 'string') {
      // Clean and Parse JSON Response
      const cleaned = extractedData
        .replace(/```json|```/gi, '')  // Remove markdown JSON formatting
        .trim();

      try {
        extractedData = JSON.parse(cleaned);
      } catch (err) {
        console.error("❌ JSON parse error:", err);
        return res.status(500).json({ error: "Failed to parse Gemini response." });
      }
    } else {
      console.warn("⚠ Gemini response was empty or malformed:", extractedData);
      return res.status(500).json({ error: "Invalid response from Gemini service." });
    }

    console.log('📄 Extracted data:', extractedData);
    
    // Return the extracted data directly without saving to database
    res.json({ 
      success: true, 
      extractedData,
    });

  } catch (err) {
    console.error("❌ OCR Controller Error:", err);
    res.status(500).json({ error: err.message });
  }
}

export const fileupload = async (req, res) => {
  try {
    // Validate file existence
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        success: false,
        message: "Invalid file type. Only JPG, JPEG and PNG allowed"
      });
    }

    // Optimize image
    const optimizedImage = await sharp(req.file.buffer)
      .resize({
        width: 800,
        height: 800,
        fit: "inside",
        withoutEnlargement: true
      })
      .jpeg({ quality: 80 })
      .toBuffer();

    // Convert to base64
    const base64Image = `data:${req.file.mimetype};base64,${optimizedImage.toString("base64")}`;

    // Upload to Cloudinary
    const { secure_url } = await uploadToCloudinary(base64Image);

    // Return success response
    return res.status(200).json({
      success: true,
      url: secure_url
    });

  } catch (error) {
    console.error("File Upload Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error uploading file",
      error: error.message
    });
  }
};