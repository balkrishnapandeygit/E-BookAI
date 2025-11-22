import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

export default function Create() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [targetLength, setTargetLength] = useState("medium");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [progress, setProgress] = useState(0);
  const [showLibraryLink, setShowLibraryLink] = useState(false);

  const navigate = useNavigate();

  const genres = [
    "Fiction", "Non-Fiction", "Business", "Self-Help",
    "Technology", "Marketing", "Education", "Health & Wellness"
  ];

  const lengthOptions = [
    { value: "short", label: "Short", desc: "~5,000 words" },
    { value: "medium", label: "Medium", desc: "~15,000 words" },
    { value: "long", label: "Long", desc: "~30,000 words" }
  ];

  const maxChars = 500;
  const charCount = description.length;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");
    setLoading(true);
    setShowLibraryLink(false);
    setProgress(0);

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("You must be logged in to create an e-book.");
      setMessageType("error");
      setLoading(false);
      return;
    }

    try {
      const res = await API.post(
        "/api/ebook/create",
        { title, description, genre, targetLength },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data?.success) {
        setMessage("E-book created successfully!");
        setMessageType("success");
        setShowLibraryLink(true); // ✅ show button to go to library

        // reset form
        setTitle("");
        setDescription("");
        setGenre("");
        setTargetLength("medium");
      } else {
        setMessage(res.data?.message || "Failed to create e-book.");
        setMessageType("error");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Error creating e-book.");
      setMessageType("error");
    } finally {
      setLoading(false);
      setProgress(100);
    }
  };

  const handleNavigateToLibrary = () => {
    navigate("/my-books");
  };

  const handleReset = () => {
    setTitle("");
    setDescription("");
    setGenre("");
    setTargetLength("medium");
    setMessage("");
    setMessageType("");
    setShowLibraryLink(false);
    setProgress(0);
  };

  return (
     <div className="create-root">
      <div className="container">
        <header className="header">
          <div className="header-icon">
            <div className="icon-circle">
              <span className="icon">✨</span>
            </div>
          </div>
          <h1 className="title">
            Create New <span className="accent">E-Book</span>
          </h1>
          <p className="subtitle">
            Configure your project settings and let our AI generate professional, 
            long-form content tailored to your specifications.
          </p>
        </header>

        <div className="form-card">
          <div className="form">
            <div className="form-group">
              <label className="label">
                Project Title <span className="required">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input"
                placeholder="Enter your e-book title..."
                maxLength={100}
                disabled={loading}
              />
              <div className="input-hint">
                This will be the main title of your e-book
              </div>
            </div>

            <div className="form-group">
              <label className="label">Genre / Category</label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="input select"
                disabled={loading}
              >
                <option value="">Select a genre (optional)</option>
                {genres.map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
              <div className="input-hint">
                Helps our AI tailor the tone and style appropriately
              </div>
            </div>

            <div className="form-group">
              <label className="label">Target Length</label>
              <div className="length-options">
                {lengthOptions.map(option => (
                  <label
                    key={option.value}
                    className={`length-card ${targetLength === option.value ? 'active' : ''}`}
                  >
                    <input
                      type="radio"
                      name="length"
                      value={option.value}
                      checked={targetLength === option.value}
                      onChange={(e) => setTargetLength(e.target.value)}
                      disabled={loading}
                    />
                    <div className="length-content">
                      <div className="length-label">{option.label}</div>
                      <div className="length-desc">{option.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="label">
                Description / Outline
                <span className="optional">Optional</span>
              </label>
              <textarea
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input textarea"
                placeholder="Provide a brief description or outline for your e-book. Include key topics, themes, or specific points you want covered..."
                maxLength={maxChars}
                disabled={loading}
              />
              <div className="char-counter">
                <span className={charCount > maxChars * 0.9 ? 'warning' : ''}>
                  {charCount} / {maxChars}
                </span>
              </div>
            </div>

            {loading && (
              <div className="progress-section">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="progress-text">
                  Generating your e-book... {progress}%
                </div>
              </div>
            )}

            {message && (
              <div className={`message message-${messageType}`}>
                <div className="message-icon">
                  {messageType === 'success' && '✓'}
                  {messageType === 'error' && '✕'}
                  {messageType === 'info' && 'ℹ'}
                </div>
                <div className="message-text">{message}</div>
              </div>
            )}

            <div className="form-actions">
              <button
                onClick={handleSubmit}
                className="btn btn-primary"
                disabled={loading || !title.trim()}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Generating...
                  </>
                ) : (
                  <>
                    <span className="btn-icon">🚀</span>
                    Generate E-Book
                  </>
                )}
              </button>

              {!loading && (title || description || genre) && (
                <button
                  onClick={handleReset}
                  className="btn btn-secondary"
                >
                  Reset Form
                </button>
              )}

              {showLibraryLink && (
                <button
                  onClick={handleNavigateToLibrary}
                  className="btn btn-success"
                >
                  <span className="btn-icon">📚</span>
                  View in Library
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="features">
          <div className="feature-item">
            <div className="feature-icon">⚡</div>
            <div className="feature-content">
              <div className="feature-title">Lightning Fast</div>
              <div className="feature-desc">Generate in minutes</div>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🧠</div>
            <div className="feature-content">
              <div className="feature-title">AI-Powered</div>
              <div className="feature-desc">GPT-4 technology</div>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🎨</div>
            <div className="feature-content">
              <div className="feature-title">Auto-Formatted</div>
              <div className="feature-desc">Professional layouts</div>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">💾</div>
            <div className="feature-content">
              <div className="feature-title">Export Ready</div>
              <div className="feature-desc">PDF, EPUB & more</div>
            </div>
          </div>
        </div>

        <div className="help-section">
          <h3 className="help-title">💡 Tips for Better Results</h3>
          <ul className="help-list">
            <li>Be specific with your title - it guides the AI's content generation</li>
            <li>Provide a detailed description to get more targeted content</li>
            <li>Choose the appropriate genre for better tone and style matching</li>
            <li>Start with shorter lengths to test, then scale up</li>
          </ul>
        </div>
      </div>

      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .create-root {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0118 0%, #1a0b2e 50%, #0f0520 100%);
          color: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', sans-serif;
          padding: 48px 24px 80px;
          position: relative;
        }

        .create-root::before {
          content: '';
          position: absolute;
          top: -20%;
          left: -10%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .container {
          max-width: 800px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .header {
          text-align: center;
          margin-bottom: 48px;
        }

        .header-icon {
          margin-bottom: 20px;
        }

        .icon-circle {
          width: 80px;
          height: 80px;
          margin: 0 auto;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.2));
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(10px);
        }

        .icon {
          font-size: 36px;
        }

        .title {
          font-size: 40px;
          font-weight: 700;
          margin-bottom: 12px;
          letter-spacing: -0.02em;
        }

        .accent {
          background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .subtitle {
          font-size: 16px;
          line-height: 1.6;
          color: #a0a0a0;
          max-width: 600px;
          margin: 0 auto;
        }

        .form-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          padding: 40px;
          backdrop-filter: blur(20px);
          margin-bottom: 32px;
        }

        .form {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .label {
          font-size: 14px;
          font-weight: 600;
          color: #ffffff;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .required {
          color: #ef4444;
          font-weight: 700;
        }

        .optional {
          font-size: 12px;
          font-weight: 400;
          color: #888888;
          margin-left: 8px;
        }

        .input {
          width: 100%;
          padding: 14px 16px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: #ffffff;
          font-size: 15px;
          font-family: inherit;
          transition: all 0.2s ease;
        }

        .input:focus {
          outline: none;
          background: rgba(255, 255, 255, 0.06);
          border-color: #8b5cf6;
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
        }

        .input:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .input::placeholder {
          color: #666666;
        }

        .select {
          cursor: pointer;
        }

        .textarea {
          resize: vertical;
          min-height: 120px;
          line-height: 1.6;
        }

        .input-hint {
          font-size: 13px;
          color: #888888;
        }

        .char-counter {
          display: flex;
          justify-content: flex-end;
          font-size: 13px;
          color: #888888;
        }

        .char-counter .warning {
          color: #fbbf24;
        }

        .length-options {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 12px;
        }

        .length-card {
          position: relative;
          padding: 18px;
          background: rgba(255, 255, 255, 0.03);
          border: 2px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .length-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(139, 92, 246, 0.3);
        }

        .length-card.active {
          background: rgba(139, 92, 246, 0.15);
          border-color: #8b5cf6;
        }

        .length-card input {
          position: absolute;
          opacity: 0;
          pointer-events: none;
        }

        .length-content {
          text-align: center;
        }

        .length-label {
          font-size: 15px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 4px;
        }

        .length-desc {
          font-size: 12px;
          color: #888888;
        }

        .progress-section {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 20px;
          background: rgba(139, 92, 246, 0.08);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 12px;
        }

        .progress-bar {
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #8b5cf6, #ec4899);
          border-radius: 8px;
          transition: width 0.3s ease;
        }

        .progress-text {
          font-size: 14px;
          color: #ffffff;
          text-align: center;
          font-weight: 500;
        }

        .message {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          border-radius: 12px;
          font-size: 14px;
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .message-success {
          background: rgba(34, 197, 94, 0.15);
          border: 1px solid rgba(34, 197, 94, 0.3);
          color: #22c55e;
        }

        .message-error {
          background: rgba(239, 68, 68, 0.15);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #ef4444;
        }

        .message-info {
          background: rgba(59, 130, 246, 0.15);
          border: 1px solid rgba(59, 130, 246, 0.3);
          color: #3b82f6;
        }

        .message-icon {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 16px;
        }

        .message-text {
          flex: 1;
          line-height: 1.5;
        }

        .form-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 8px;
        }

        .btn {
          flex: 1;
          min-width: 180px;
          padding: 14px 28px;
          border: none;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-family: inherit;
        }

        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-primary {
          background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
          color: white;
          box-shadow: 0 4px 20px rgba(139, 92, 246, 0.3);
        }

        .btn-primary:hover:not(:disabled) {
          box-shadow: 0 6px 30px rgba(139, 92, 246, 0.4);
          transform: translateY(-2px);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
        }

        .btn-secondary:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.08);
        }

        .btn-success {
          background: linear-gradient(90deg, #22c55e, #10b981);
          color: white;
          box-shadow: 0 4px 20px rgba(34, 197, 94, 0.3);
        }

        .btn-success:hover:not(:disabled) {
          box-shadow: 0 6px 30px rgba(34, 197, 94, 0.4);
          transform: translateY(-2px);
        }

        .btn-icon {
          font-size: 18px;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 16px;
          margin-bottom: 32px;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 18px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          backdrop-filter: blur(10px);
        }

        .feature-icon {
          font-size: 28px;
        }

        .feature-content {
          flex: 1;
        }

        .feature-title {
          font-size: 14px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 2px;
        }

        .feature-desc {
          font-size: 12px;
          color: #888888;
        }

        .help-section {
          padding: 28px;
          background: rgba(59, 130, 246, 0.08);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 20px;
          backdrop-filter: blur(10px);
        }

        .help-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 16px;
          color: #ffffff;
        }

        .help-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding-left: 20px;
        }

        .help-list li {
          font-size: 14px;
          line-height: 1.6;
          color: #a0a0a0;
        }

        @media (max-width: 768px) {
          .create-root {
            padding: 32px 16px 60px;
          }

          .title {
            font-size: 32px;
          }

          .subtitle {
            font-size: 15px;
          }

          .form-card {
            padding: 28px 20px;
          }

          .length-options {
            grid-template-columns: 1fr;
          }

          .features {
            grid-template-columns: 1fr;
          }

          .btn {
            min-width: 100%;
          }

          .form-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
