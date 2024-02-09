import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import App from './App';
import Plans from './App/ui/views/Plans';
import Resumen from './App/ui/views/Resumen/Resumen';
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/RetoSofttek/" element={<App />} />
        <Route path="/RetoSofttek/plans" element={<Plans />} />
        <Route path="/RetoSofttek/resumen" element={<Resumen />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
