import React, { useState } from 'react';
import EmployeeList from './components/EmployeeList';
import FavoritesList from './components/FavoritesList';
import EmployeeDetails from './components/EmployeeDetails';
import { EmployeeProvider } from './context/EmployeeContext';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

function App() {
  const [company, setCompany] = useState('google');

  const handleCompanyChange = (e) => {
    setCompany(e.target.value);
  };

  return (
    <EmployeeProvider>
      <Router>
        <div className="App container">
          <header className="App-header">
            <h1>Employee Directory</h1>
            <input
              type="text"
              value={company}
              onChange={handleCompanyChange}
              placeholder="Enter company name"
              className="company-input"
            />
            <nav className="main-nav">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/favorites" className="nav-link">Favorites</Link>
            </nav>
          </header>
          <Routes>
            <Route path="/" element={<EmployeeList company={company} />} />
            <Route path="/favorites" element={<FavoritesList />} />
            <Route path="/employee/:id" element={<EmployeeDetails />} />
          </Routes>
        </div>
      </Router>
    </EmployeeProvider>
  );
}

export default App;
