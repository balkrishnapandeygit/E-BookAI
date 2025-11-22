import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Create from "./pages/Create";
import MyBooks from "./pages/MyBooks";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      
      
      
      <Route 
        path="/create" 
        element={
          <PrivateRoute>
            <>
              <Navbar />
              <Create />
            </>
          </PrivateRoute>
        } 
      />

      <Route 
        path="/my-books" 
        element={
          <PrivateRoute>
            <>
              <Navbar />
              <MyBooks />
            </>
          </PrivateRoute>
        } 
      />
      
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
