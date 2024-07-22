import React, { useContext, useState, useEffect } from 'react';
import { EmployeeContext } from '../context/EmployeeContext';
import { Link } from 'react-router-dom';
import './EmployeeItem.css';

const EmployeeItem = ({ employee }) => {
  const { addToFavorites, removeFromFavorites, favorites } = useContext(EmployeeContext);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(favorites.some(fav => fav.email === employee.email));
  }, [favorites, employee.email]);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFromFavorites(employee.email);
    } else {
      addToFavorites(employee);
    }
  };

  return (
    <div className="employee-card">
      <img src={employee.picture.thumbnail} className="employee-image" alt={`${employee.name.first} ${employee.name.last}`} />
      <div className="employee-details">
        <h5>{`${employee.name.first} ${employee.name.last}`}</h5>
        <p>Age: {employee.dob.age}</p>
        <p>Location: {employee.location.city}, {employee.location.country}</p>
        <p>{employee.email}</p>
        <Link to={`/employee/${employee.login.uuid}`} className="details-button">More Details</Link>
        <div className="favorite-button-container">
          <button
            className={`favorite-button ${isFavorite ? 'remove' : 'add'}`}
            onClick={handleFavoriteClick}
          >
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeItem;