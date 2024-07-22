// EmployeeContext.js

import React, { createContext, useState } from 'react';

const EmployeeContext = createContext();

const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null); // Ensure error state is defined

  const addToFavorites = (employee) => {
    if (!favorites.some(fav => fav.email === employee.email)) {
      setFavorites([...favorites, employee]);
      localStorage.setItem('FAVS', JSON.stringify([...favorites, employee]));
    }
  };

  const removeFromFavorites = (email) => {
    const updatedFavorites = favorites.filter(emp => emp.email !== email);
    setFavorites(updatedFavorites);
    localStorage.setItem('FAVS', JSON.stringify(updatedFavorites));
  };

  return (
    <EmployeeContext.Provider value={{ employees, setEmployees, favorites, addToFavorites, removeFromFavorites, error, setError }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export { EmployeeContext, EmployeeProvider };
