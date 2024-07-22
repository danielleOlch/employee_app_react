import React, { useContext, useEffect, useState } from 'react';
import { EmployeeContext } from '../context/EmployeeContext';
import EmployeeItem from './EmployeeItem';
import ErrorMessage from './ErrorMessage';
import './EmployeeList.css';

const EmployeeList = ({ company }) => {
  const { employees, setEmployees, error, setError } = useContext(EmployeeContext);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(`https://randomuser.me/api/?results=10&seed=${company}`);
        if (!response.ok) {
          throw new Error('Failed to fetch employees');
        }
        const data = await response.json();
        setEmployees(data.results);
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchEmployees();
  }, [company, setEmployees, setError]);

  const filteredEmployees = employees.filter(employee =>
    employee.name.first.toLowerCase().includes(search.toLowerCase()) ||
    employee.name.last.toLowerCase().includes(search.toLowerCase())
  );

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="employee-list-container">
      <h2 style={{ color: 'midnightblue', textAlign: 'left' }}>Employee List</h2>
      <input
        type="text"
        className="search-input"
        placeholder="Search employees"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="employee-grid">
        {filteredEmployees.map((employee, index) => (
          <EmployeeItem key={index} employee={employee} />
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;