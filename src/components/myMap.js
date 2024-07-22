import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

const MyMap = ({ employee }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!employee || !employee.location || !employee.location.coordinates) return;

    const latitude = parseFloat(employee.location.coordinates.latitude);
    const longitude = parseFloat(employee.location.coordinates.longitude);

    const map = L.map(mapRef.current).setView([latitude, longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    L.marker([latitude, longitude])
      .addTo(map)
      .bindPopup(`${employee.name.first} ${employee.name.last}`)
      .openPopup();

    return () => {
      map.remove();
    };
  }, [employee]);

  return <div ref={mapRef} className="map-container" style={{ height: '400px' }} />;
};

export default MyMap;
