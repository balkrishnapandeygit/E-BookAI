import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../utils/api";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const res = await API.post("/api/auth/register", form);
      // server should return 201 or success msg
      if (res.status === 201 || res.data?.success) {
        setMessage("Registered successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 1200);
      } else {
        setMessage(res.data?.message || "Registration succeeded (unexpected response).");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create your account</h2>

        <form onSubmit={handleSubmit}>
          <label className="label">Name</label>
          <input name="name" className="field" value={form.name} onChange={onChange} required />

          <label className="label">Email</label>
          <input name="email" type="email" className="field" value={form.email} onChange={onChange} required />

          <label className="label">Password</label>
          <input name="password" type="password" className="field" value={form.password} onChange={onChange} required minLength={6} />

          <button className="btn" disabled={loading}>{loading ? "Creating…" : "Register"}</button>

          {message && <p className={`msg ${message.startsWith("❌") ? "error" : ""}`}>{message}</p>}
        </form>

        <p className="small">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>

      <style>{`
        /* reuse login styles */
        .auth-page { min-height: 100vh; display:flex; align-items:center; justify-content:center; background:#030014; padding:40px 20px; color:#e6e6e6; }
        .auth-card { width:100%; max-width:480px; background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01)); border:1px solid rgba(255,255,255,0.06); padding:28px; border-radius:12px; box-shadow:0 12px 40px rgba(0,0,0,0.6); }
        h2 { margin:0 0 14px 0; color:white; font-size:20px; }
        .label { display:block; margin-top:12px; font-size:13px; color:#bdbdbd; }
        .field { width:100%; padding:10px 12px; border-radius:8px; border:1px solid rgba(255,255,255,0.05); background:rgba(255,255,255,0.02); color:#fff; margin-top:6px; outline:none; font-size:14px; }
        .field:focus { box-shadow:0 0 0 6px rgba(168,85,247,0.08); border-color:rgba(168,85,247,0.8); }
        .btn { width:100%; margin-top:18px; padding:11px 14px; border-radius:10px; border:none; background:linear-gradient(90deg,#7b2ff7,#f107a3); color:white; font-weight:600; cursor:pointer; }
        .msg { margin-top:12px; font-size:14px; color:#d1ffd1; }
        .msg.error { color:#ff9a9a; }
        .small { margin-top:14px; color:#bdbdbd; font-size:13px; }
        .small a { color:#f6c0ff; text-decoration:none; }
      `}</style>
    </div>
  );
}
