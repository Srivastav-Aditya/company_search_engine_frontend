import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './pages/Home';
import Register from './components/Register';
import { isAuthenticated } from './utils/auth';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login />} />
        
        <Route
          path="/*"
          element={
            isAuthenticated() ? <Home /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
