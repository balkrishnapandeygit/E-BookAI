import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../utils/api";

const Dashboard = () => {
const hours = new Date().getHours();
const greeting =
hours < 12 ? "Good Morning" :
hours < 17 ? "Good Afternoon" :
"Good Evening";

const [stats, setStats] = useState({
total: 0,
drafts: 0,
published: 0,
});

useEffect(() => {
fetchBookStats();
}, []);

const fetchBookStats = async () => {
try {
const token = localStorage.getItem("token");
const res = await API.get("/api/ebook/my-books", {
headers: { Authorization: `Bearer ${token}` },
});


  const books = res.data?.ebooks || [];

  setStats({
    total: books.length,
    drafts: books.filter((b) => b.status === "draft").length,
    published: books.filter((b) => b.status === "published").length,
  });
} catch (err) {
  console.error(err);
}


};

return ( <div className="dashboard"> <div className="container">


    {/* Header */}
    <div className="header">
      <div>
        <h1 className="greeting">{greeting}</h1>
        <p className="subtitle">Ready to create something today?</p>
      </div>

      <div className="stats">
        <div className="pill">
          <div className="pill-value">{stats.total}</div>
          <div className="pill-label">Total Books</div>
        </div>
        <div className="pill">
          <div className="pill-value">{stats.drafts}</div>
          <div className="pill-label">Drafts</div>
        </div>
        <div className="pill">
          <div className="pill-value">{stats.published}</div>
          <div className="pill-label">Published</div>
        </div>
      </div>
    </div>

    {/* Quick Actions */}
    <div className="actions">
      <Link to="/create" className="action-card primary">
        ✨ Create New E-Book
      </Link>

      <Link to="/my-books" className="action-card secondary">
        📚 My Library
      </Link>
    </div>

    {/* Recent */}
    <h2 className="section-title">Recent Work</h2>
    <p style={{ opacity: 0.6 }}>No recent books yet.</p>
  </div>

  <style>
    {`
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
    }

    .dashboard {
      min-height: 100vh;
      background: #0c051a;
      color: #fff;
      padding: 40px 24px;
    }

    .container {
      max-width: 1000px;
      margin: auto;
    }

    .header {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-bottom: 32px;
    }

    .greeting {
      font-size: 32px;
      font-weight: bold;
    }

    .subtitle {
      color: #bbb;
      margin-top: 8px;
    }

    .stats {
      display: flex;
      gap: 12px;
      margin-top: 10px;
    }

    .pill {
      padding: 12px 18px;
      background: rgba(255,255,255,0.08);
      border-radius: 8px;
      text-align: center;
    }

    .pill-value {
      font-size: 20px;
      font-weight: bold;
    }

    .actions {
      display: flex;
      gap: 16px;
      margin: 30px 0;
      flex-wrap: wrap;
    }

    .action-card {
      text-decoration: none;
      padding: 20px 178px;
      border-radius: 8px;
      display: inline-block;
      transition: 0.3s;
      color: white;
    }

    .action-card:hover {
      transform: translateY(-4px);
    }

    .primary {
      background: purple;
    }

    .secondary {
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
    }

    .section-title {
      font-size: 22px;
      margin: 20px 0 10px;
    }
    `}
  </style>
</div>


);
};

export default Dashboard;
