import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';
import Logout from './pages/Logout';
import Header from './components/Header';
import Home from './pages/Home';
import Plotanalysis from './components/Plotpage';
import SoilAnalysis from './components/Soilanalysis';
import About from './pages/About';
import Contact from './pages/contact';

// simple route guard component
const ProtectedRoute = ({ token, children }) => {
  if (!token) return <Navigate to="/signin" replace />;
  return children;
};

function App() {
  const [token, setToken] = React.useState(localStorage.getItem('token'));

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/Plotanalysis"
          element={
            <ProtectedRoute token={token}>
              <Plotanalysis />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Soilanalysis"
          element={
            <ProtectedRoute token={token}>
              <SoilAnalysis />
            </ProtectedRoute>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin onLogin={handleLogin} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute token={token}>
              <Profile token={token} />
            </ProtectedRoute>
          }
        />
        <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact/>}/>
        <Route path="*" element={<Navigate to={token ? "/profile" : "/signin"} />} />
      </Routes>
    </Router>
  );
}

export default App;
