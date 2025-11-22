import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import eBook from "../models/eBook.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

// ✅ Create Ebook and generate PDF
export const createEbook = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    if (!process.env.GENAI_API_KEY) {
      return res.status(500).json({ message: "API Key not configured" });
    }

    // Generate content with Gemini
    const genAI = new GoogleGenerativeAI(process.env.GENAI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = `Write a comprehensive ebook chapter about "${title}". ${
      description ? `Context: ${description}` : ""
    } Make it detailed and well-structured.`;

    const response = await model.generateContent(prompt);
    const content = response.response.text();

    // Generate PDF file
    const doc = new PDFDocument();
    const fileName = `${title.replace(/\s+/g, "_")}_${Date.now()}.pdf`;
    const filePath = path.join(process.cwd(), "uploads", fileName); // safer absolute path
    const writeStream = fs.createWriteStream(filePath);

    doc.pipe(writeStream);
    doc.fontSize(24).text(title, { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(content);
    doc.end();

    writeStream.on("finish", async () => {
      const newEbook = await eBook.create({
        title,
        description: description || "",
        author: req.user.id,
        coverImage: "",
        pdfFile: fileName, // store filename only
      });

      res.status(201).json({
        success: true,
        message: "Ebook created and PDF saved",
        ebook: newEbook,
      });
    });

    writeStream.on("error", (err) => {
      console.error("Error writing PDF:", err);
      res.status(500).json({ message: "Failed to save PDF", error: err.message });
    });
  } catch (error) {
    console.error("Error generating ebook:", error.message);
    res.status(500).json({ message: "Error creating ebook", error: error.message });
  }
};

// ✅ Get all ebooks for logged-in user
export const getMyBooks = async (req, res) => {
  try {
    const ebooks = await eBook.find({ author: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, ebooks });
  } catch (error) {
    console.error("Error fetching ebooks:", error.message);
    res.status(500).json({ message: "Error fetching ebooks", error: error.message });
  }
};

// ✅ Delete ebook
export const deleteEbook = async (req, res) => {
  try {
    const { id } = req.params;
    const ebook = await eBook.findById(id);

    if (!ebook) {
      return res.status(404).json({ message: "Ebook not found" });
    }
    if (ebook.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this ebook" });
    }

    // Remove file from uploads folder too
    const filePath = path.join(process.cwd(), "uploads", ebook.pdfFile);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await eBook.findByIdAndDelete(id);

    res.json({ success: true, message: "Ebook deleted successfully" });
  } catch (error) {
    console.error("Error deleting ebook:", error.message);
    res.status(500).json({ message: "Error deleting ebook", error: error.message });
  }
};
