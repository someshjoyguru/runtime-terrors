import { extractTextFromImage } from '../services/ocrService.js';
import { extractInfoFromText } from '../services/geminiService.js';
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

// Keep other controller functions as they are
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({ success: true, books });
  } catch (error) {
    console.error("❌ Error fetching books:", error);
    res.status(500).json({ error: "Failed to fetch books" });
  }
};

export const getBooksByDonor = async (req, res) => {
  try {
    const { donor_id } = req.params;

    if (!donor_id) {
      return res.status(400).json({ error: "Donor ID is required" });
    }

    const books = await Book.find({ donor_id });

    if (books.length === 0) {
      return res.status(404).json({ message: "No books found for this donor." });
    }

    res.status(200).json({ success: true, books });
  } catch (error) {
    console.error("❌ Error fetching donor's books:", error);
    res.status(500).json({ error: "Failed to fetch books for the donor" });
  }
};