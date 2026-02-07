# 📘 AI Ebook Creator  
### Write Your Next Book in Minutes — Powered by Artificial Intelligence  

AI Ebook Creator is a powerful full-stack application that generates complete multi-chapter eBooks using AI (Gemini API).  
Just enter a topic or idea — the system creates a structured, publish-ready eBook and lets you download it as a PDF.

---

## 🚀 Features

### 📚 AI Book Generation  
- Enter topic or prompt → AI generates full multi-chapter eBook  
- Smart content structuring  
- Auto-generated chapter titles  
- High-quality narrative writing  

### 📝 PDF Export  
- Download full eBook as a clean & formatted PDF  
- Saves generated books in backend for later access  

### 👤 User System  
- Login / Register  
- Saved eBooks dashboard  

### ⚙️ Tech Stack  
#### **Frontend**
- React.js  
- TailwindCSS  
- Axios  

#### **Backend**
- Node.js  
- Express.js  
- MongoDB + Mongoose  

#### **AI**
- Google Gemini API  

---

## 📂 Folder Structure

```bash
AI-EBOOK-CREATOR/
│
├── backend/
│   ├── node_modules/
│   ├── src/
│   │   ├── config/         # DB config, environment setup
│   │   ├── controllers/    # AI controller, auth controller, book operations
│   │   ├── middleware/     # Auth middleware
│   │   ├── models/         # User, Book models
│   │   ├── routes/         # Auth routes, book routes, AI routes
│   │   ├── services/       # AI service (Gemini API)
│   │   ├── server.js       # Backend entry
│   ├── uploads/            # Generated PDFs storage
│   ├── .env
│   ├── package.json
│
├── frontend/
│   ├── node_modules/
│   ├── public/
│   │   └── logo.png
│   ├── src/
│   │   ├── api/            # API config
│   │   ├── asset/          # Icons, images
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Home, Login, Dashboard, Book Generator
│   │   ├── utils/          # Helper functions
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│
└── README.md
🛠️ Installation & Setup
🔧 Backend Setup
cd backend
npm install
npm start      # or nodemon server.js
Create .env file:

MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_api_key
PORT=5000
💻 Frontend Setup
cd frontend
npm install
npm run dev
📡 API Endpoints
Auth Routes
Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login user
AI / Book Routes
Method	Endpoint	Description
POST	/api/book/generate	Generate book using AI
GET	/api/book/all	Get user books
GET	/api/book/:id	Get specific book
GET	/api/book/download/:id	Download book PDF
🧠 AI Flow
User prompt → Gemini API → Chapter generation → Full book content →
PDF generation → Save to backend → Download
```
📸 Screenshots

<img width="1600" height="782" alt="image" src="https://github.com/user-attachments/assets/9e2407be-0cb5-4334-8ba6-2334be4e6035" />
<img width="1600" height="783" alt="image" src="https://github.com/user-attachments/assets/3fec3fbe-1c10-4197-9dcc-450b35fb4482" />
<img width="1600" height="783" alt="image" src="https://github.com/user-attachments/assets/4dad8ff6-2236-4a73-8c70-e4185931a9a5" />
<img width="1600" height="818" alt="image" src="https://github.com/user-attachments/assets/00a5aa08-a360-4ea6-ace0-08a5a5f05b94" />
<img width="1600" height="813" alt="image" src="https://github.com/user-attachments/assets/65dae49d-0e26-45ca-8941-c0618f2601d4" />
<img width="1600" height="767" alt="image" src="https://github.com/user-attachments/assets/abc2e4d7-bf5c-4ca8-a6b2-271b595dce25" />
<img width="1600" height="768" alt="image" src="https://github.com/user-attachments/assets/7fe14dcb-2753-4890-9a2e-8039e3a6b03c" />
<img width="1600" height="774" alt="image" src="https://github.com/user-attachments/assets/f2bbd6e7-c2f3-4b10-b877-856984450727" />
<img width="1600" height="715" alt="image" src="https://github.com/user-attachments/assets/ded50e26-ca89-4517-9108-89f45830f1f3" />

🛣️ Future Improvements
Add EPUB export

Add voice-based book generation

Add AI book cover generator

Add multi-language support

Add collaborative writing mode

📜 License
This project is MIT Licensed.

⭐ Support
If you like this project, please ⭐ star the repository — it motivates me to build more!
