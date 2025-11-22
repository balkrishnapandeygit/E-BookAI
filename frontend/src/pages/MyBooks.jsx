import React, { useState, useEffect } from "react";
import API from "../utils/api";
import { useLocation } from "react-router-dom";

export default function MyBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const [message, setMessage] = useState("");
  const [generatingPdfId, setGeneratingPdfId] = useState(null);

  const location = useLocation();

  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (location.state?.newBook) {
      setBooks((prev) => [location.state.newBook, ...prev]);
    }
  }, [location.state]);

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/api/ebook/my-books", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data?.success) setBooks(res.data.ebooks || []);
      else setMessage("Failed to load books");
    } catch (err) {
      console.error(err);
      setMessage("Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  const deleteBook = async (id) => {
    if (!window.confirm("Delete this ebook?")) return;
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/api/ebook/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks((prev) => prev.filter((b) => b._id !== id));
      setMessage("Ebook deleted");
    } catch (err) {
      console.error(err);
      setMessage("Failed to delete ebook");
    }
  };

  const downloadPDF = async (book) => {
    setGeneratingPdfId(book._id);
    try {
      const link = document.createElement("a");
      // If you mounted /uploads statically and added a download route, use the route:
      // link.href = `http://localhost:5000/api/ebook/download/${book.pdfFile}`;
      // Or direct static URL (recommended for preview/iframe):
      link.href = `http://localhost:5000/uploads/${book.pdfFile}`;
      link.download = `${book.title.replace(/\s+/g, "_")}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Download failed", err);
      alert("Failed to download PDF");
    } finally {
      setGeneratingPdfId(null);
    }
  };

  if (loading)
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#ddd" }}>
        Loading...
      </div>
    );

  return (
    <div style={{ minHeight: "100vh", background: "#030014", color: "#eaeaea", padding: "32px 20px", fontFamily: "Inter, Arial, sans-serif" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: 18 }}>
          <h1 style={{ margin: 0, fontSize: 28 }}>My E-Books</h1>
          <p style={{ color: "#bdbdbd", marginTop: 6 }}>Manage and download your books</p>
        </div>

        {message && <div style={{ marginBottom: 12, padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.02)" }}>{message}</div>}

        {books.length === 0 ? (
          <div style={{ padding: 28, background: "rgba(255,255,255,0.02)", borderRadius: 12 }}>
            <p style={{ color: "#bdbdbd" }}>No e-books yet.</p>
            <a href="/create" style={{ display: "inline-block", marginTop: 10, padding: "10px 14px", background: "linear-gradient(90deg,#7b2ff7,#f107a3)", color: "white", borderRadius: 8, textDecoration: "none" }}>
              Create Your First E-Book
            </a>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16 }}>
            {books.map((book) => (
              <div key={book._id} style={{ padding: 18, borderRadius: 12, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.03)" }}>
                <img src={book.coverImage || "/default-cover.png"} alt="cover" style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 8, marginBottom: 12 }} />

                <h3 style={{ margin: 0 }}>{book.title}</h3>
                <p style={{ color: "#cfcfcf", marginTop: 8, minHeight: 48, fontSize: "0.9rem" }}>
                   {book.description ? book.description.substring(0, 60) + "..." : "No description"}
                </p>

                <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                  <button onClick={() => setSelectedBook(book)} style={{ flex: 1, padding: "8px 10px", borderRadius: 8, background: "linear-gradient(90deg,#7b2ff7,#f107a3)", border: "none", color: "white", cursor: "pointer" }}>
                    View
                  </button>
                  
                  <button 
                    onClick={() => downloadPDF(book)} 
                    disabled={generatingPdfId === book._id}
                    style={{ padding: "8px 10px", borderRadius: 8, background: "#00b894", border: "none", color: "#fff", cursor: "pointer", opacity: generatingPdfId === book._id ? 0.7 : 1 }}
                  >
                    {generatingPdfId === book._id ? "..." : "PDF"}
                  </button>

                  <button onClick={() => deleteBook(book._id)} style={{ padding: "8px 10px", borderRadius: 8, background: "transparent", border: "1px solid rgba(255,255,255,0.06)", color: "#ff9a9a", cursor: "pointer" }}>
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedBook && (
          <div style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.8)", zIndex: 999 }}>
            <div style={{ width: "90%", maxWidth: 800, height: "80vh", background: "#1a1a2e", borderRadius: 12, overflow: "hidden", display: "flex", flexDirection: "column", border: "1px solid #333" }}>
              <div style={{ padding: 16, borderBottom: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#16213e" }}>
                <h3 style={{ margin: 0 }}>{selectedBook.title}</h3>
                <button onClick={() => setSelectedBook(null)} style={{ background: "transparent", border: "none", fontSize: 24, color: "#fff", cursor: "pointer" }}>✕</button>
              </div>

              <div style={{ display: "flex", height: "100%" }}>
                <div style={{ width: "250px", borderRight: "1px solid rgba(255,255,255,0.1)", padding: 16, overflowY: "auto", background: "#0f3460" }}>
                  <h4 style={{ marginTop: 0, color: "#a6a6a6", fontSize: "0.9rem", textTransform: "uppercase" }}>Chapters</h4>
                  {selectedBook.chapters && selectedBook.chapters.length > 0 ? (
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      {selectedBook.chapters.map((chap, i) => (
                        <li key={i} style={{ padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", color: "#ddd", fontSize: "0.95rem" }}>
                          {i + 1}. {chap.title}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p style={{ color: "#666", fontSize: "0.9rem" }}>No chapters added yet.</p>
                  )}
                </div>

                <div style={{ flex: 1, padding: 24, overflowY: "auto", background: "#fff", color: "#333" }}>
                  {selectedBook.pdfFile ? (
                    <iframe
                      src={`http://localhost:5000/uploads/${selectedBook.pdfFile}`}
                      title="Book Preview"
                      style={{ width: "100%", height: "100%", border: "none" }}
                    />
                  ) : (
                    <div>
                      <div style={{display:'flex', gap: 20, marginBottom: 30}}>
                        <img src={selectedBook.coverImage} alt="cover" style={{width: 120, borderRadius: 8}} />
                        <div>
                          <h2 style={{margin:0, color: "#000"}}>{selectedBook.title}</h2>
                          <p style={{color: "#555"}}>{selectedBook.description}</p>
                        </div>
                      </div>
                      <hr style={{borderColor: "#eee"}}/>
                      {selectedBook.chapters?.map((chap, i) => (
                        <div key={i} style={{ marginBottom: 40 }}>
                          <h3>{chap.title}</h3>
                          <p style={{ lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{chap.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
