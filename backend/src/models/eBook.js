import mongoose from "mongoose";

const eBookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  coverImage: String, 
  pdfFile: String,   
  
  
  chapters: [
    {
      title: { type: String, required: true },
      content: { type: String, required: true } 
    }
  ],
 

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("eBook", eBookSchema);