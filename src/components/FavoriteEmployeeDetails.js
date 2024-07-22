// FavoriteEmployeeDetails.js
import React, { useState, useEffect } from 'react';

const FavoriteEmployeeDetails = ({ id }) => {
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('FAVS')) || [];
    const selectedEmployee = favorites.find(emp => emp.login.uuid === id);
    if (selectedEmployee) {
      setEmployee(selectedEmployee);
    }
  }, [id]);

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Details for {`${employee.name.first} ${employee.name.last}`}</h2>
      <p>Email: {employee.email}</p>
      <p>Phone: {employee.phone}</p>
    
    </div>
  );
};

export default FavoriteEmployeeDetails;