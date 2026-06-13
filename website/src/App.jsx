import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EstimatorPage from './pages/EstimatorPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/estimator" element={<EstimatorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
