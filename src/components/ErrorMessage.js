import React from 'react';
import './ErrorMessage.css'; // Assuming you will create this CSS file

const ErrorMessage = ({ message }) => {
  return <div className="error-message">{message}</div>;
};

export default ErrorMessage;
