import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import PESTAnalysis from './pages/PESTAnalysis';
import PorterAnalysis from './pages/PorterAnalysis';
import SWOTAnalysis from './pages/SWOTAnalysis';
import CompetitorAnalysis from './pages/CompetitorAnalysis';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Navigate to="/pest" replace />} />
            <Route path="/pest" element={<PESTAnalysis />} />
            <Route path="/porter" element={<PorterAnalysis />} />
            <Route path="/swot" element={<SWOTAnalysis />} />
            <Route path="/competitors" element={<CompetitorAnalysis />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;