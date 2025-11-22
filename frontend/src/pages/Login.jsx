import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../utils/api";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const res = await API.post("/api/auth/login", { email, password });
      if (res?.data?.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      } else {
        setMessage("Login failed: invalid response");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Sign in to EbookAI</h2>

        <form onSubmit={handleLogin}>
          <label className="label">Email</label>
          <input
            className="field"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="label">Password</label>
          <input
            className="field"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Logging in…" : "Login"}
          </button>

          {message && <p className="msg error">{message}</p>}
        </form>

        <p className="small">
          Don't have an account? <Link to="/register">Create one</Link>
        </p>
      </div>

      <style>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #030014;
          padding: 40px 20px;
          color: #e6e6e6;
          font-family: Inter, Arial, sans-serif;
        }
        .auth-card {
          width: 100%;
          max-width: 420px;
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
          border: 1px solid rgba(255,255,255,0.06);
          padding: 28px;
          border-radius: 12px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.6);
        }
        .auth-card h2 {
          margin: 0 0 18px 0;
          font-size: 20px;
          color: white;
        }
        .label {
          display: block;
          margin-top: 12px;
          font-size: 13px;
          color: #bdbdbd;
        }
        .field {
          width: 100%;
          padding: 10px 12px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.05);
          background: rgba(255,255,255,0.02);
          color: #fff;
          margin-top: 6px;
          outline: none;
          font-size: 14px;
        }
        .field:focus {
          box-shadow: 0 0 0 6px rgba(168,85,247,0.08);
          border-color: rgba(168,85,247,0.8);
        }
        .btn {
          width: 100%;
          margin-top: 18px;
          padding: 11px 14px;
          border-radius: 10px;
          border: none;
          background: linear-gradient(90deg,#7b2ff7,#f107a3);
          color: white;
          font-weight: 600;
          cursor: pointer;
        }
        .btn:disabled { opacity: 0.65; cursor: not-allowed; }
        .msg { margin-top: 12px; font-size: 14px; }
        .msg.error { color: #ff8b8b; }
        .small { margin-top: 14px; color: #bdbdbd; font-size: 13px; }
        .small a { color: #f6c0ff; text-decoration: none; }
      `}</style>
    </div>
  );
}

export default Login;
