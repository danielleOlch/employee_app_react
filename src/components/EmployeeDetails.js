import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EmployeeContext } from '../context/EmployeeContext';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Ensure Leaflet CSS is imported

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const { employees, favorites } = useContext(EmployeeContext);

  useEffect(() => {
    const fetchEmployee = async () => {
      let foundEmployee = favorites.find(emp => emp.login.uuid === id);
      if (!foundEmployee) {
        foundEmployee = employees.find(emp => emp.login.uuid === id);
      }

      if (foundEmployee) {
        setEmployee(foundEmployee);
      } else {
        try {
          const response = await fetch(`https://randomuser.me/api/?uuid=${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch employee');
          }
          const data = await response.json();
          setEmployee(data.results[0]);
        } catch (error) {
          console.error('Error fetching employee:', error);
        }
      }
    };

    fetchEmployee();
  }, [id, employees, favorites]);

  if (!employee) {
    return <div>Loading...</div>;
  }

  const fullName = `${employee.name.first} ${employee.name.last}`;
  const fullAddress = `${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state}, ${employee.location.country}`;
  const latitude = parseFloat(employee.location.coordinates.latitude);
  const longitude = parseFloat(employee.location.coordinates.longitude);

  return (
    <div>
      <h2>Employee Details</h2>
      <p>Name: {fullName}</p>
      <p>Email: {employee.email}</p>
      <p>Phone: {employee.phone}</p>
      <p>Address: {fullAddress}</p>
      {latitude && longitude && (
        <div className="map-container">
          <MapContainer center={[latitude, longitude]} zoom={13} style={{ height: '400px' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[latitude, longitude]}>
              <Popup>
                {fullName} <br /> {fullAddress}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      )}
    </div>
  );
};

export default EmployeeDetails;
