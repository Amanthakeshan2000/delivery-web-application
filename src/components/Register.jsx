import React, { useState } from 'react';
import '../css/Auth.css';

const Register = ({ onClose, switchToSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    // Handle register logic here
  };

  return (
    <div className="auth-overlay">
      <div className="auth-container">
        <button className="auth-close-btn" onClick={onClose}>&times;</button>
        <h2 className="text-3xl font-extrabold mb-6 text-center text-Blue decoration-wavy  ">
  Sign Up
</h2>
        <form onSubmit={handleRegister}>
          <div className="auth-field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="auth-field">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-submit-btn bg-blue-500">Register</button>
        </form>
        <p className="auth-switch">
          Already have an account? <span onClick={switchToSignIn}>Sign In</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
