import React from "react";
import { useNavigate, Link } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <header className="navbar">
        <div className="navbar-container">
          <Link to="/dashboard" className="navbar-logo">
            EbookAI
          </Link>

          <nav className="navbar-menu">
            <Link to="/my-books" className="navbar-link">
              My Books
            </Link>

            <Link to="/create" className="navbar-primary">
              Create Book
            </Link>

            <button onClick={handleLogout} className="navbar-logout">
              Logout
            </button>
          </nav>
        </div>
      </header>

      <style>{`
        .navbar {
          width: 100%;
          height: 64px;
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(3, 0, 20, 0.8);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
        }

        .navbar-container {
          max-width: 1350px;
          width: 92%;
          margin: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .navbar-logo {
          color: white;
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: -0.5px;
          text-decoration: none;
        }

        .navbar-menu {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .navbar-link {
          color: #c7c7c7;
          font-size: 0.95rem;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .navbar-link:hover { color: white; }

        .navbar-primary {
          padding: 8px 18px;
          border-radius: 20px;
          background: linear-gradient(135deg, #7b2ff7 0%, #f107a3 100%);
          color: white;
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 600;
          transition: transform 0.18s ease, box-shadow 0.18s ease;
          box-shadow: 0 6px 16px rgba(0,0,0,0.18);
        }

        .navbar-primary:hover {
          transform: translateY(-2px);
        }

        .navbar-logout {
          color: #c7c7c7;
          background: transparent;
          border: none;
          font-size: 0.95rem;
          cursor: pointer;
        }

        .navbar-logout:hover { color: #ff7b7b; }

        @media (max-width: 720px) {
          .navbar-container { width: 95%; }
          .navbar-menu { gap: 10px; }
        }
      `}</style>
    </>
  );
}

export default Navbar;
