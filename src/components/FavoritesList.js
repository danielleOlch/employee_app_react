import React, { useContext } from 'react';
import { EmployeeContext } from '../context/EmployeeContext';
import EmployeeItem from './EmployeeItem';

const FavoritesList = () => {
  const { favorites } = useContext(EmployeeContext);

  return (
    <div>
      <h2 style={{ color: 'midnightblue' }}>Favorites List</h2>
      <div className="employee-grid">
        {favorites.map((employee, index) => (
          <EmployeeItem key={index} employee={employee} />
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;