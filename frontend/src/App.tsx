// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import HiveManagement from './pages/HiveManagement.jsx';
import NotificationPage from './pages/NotificationPage.jsx';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/hive-management" element={<HiveManagement />} />
      
      <Route path="/notifications" element={<NotificationPage />} />
      <Route path="/notifications/:id" element={<NotificationPage />} />
    </Routes>
  );
}

export default App;
