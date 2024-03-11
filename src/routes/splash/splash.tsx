// src/routes/splash/splash.tsx
import React from "react";
import { Link } from "react-router-dom";

const SplashPage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to My App</h1>
      <p>This is the splash page content.</p>
      <Link to="/login">Go to Login</Link>
    </div>
  );
};

export default SplashPage;