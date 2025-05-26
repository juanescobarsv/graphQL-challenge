// import React from "react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="error-message">
      <h2>Oops! Something went wrong.</h2>
      <p>{message}</p>
      <p>Please try refreshing the page or check your Internet connection.</p>
    </div>
  );
};

export default ErrorMessage;
