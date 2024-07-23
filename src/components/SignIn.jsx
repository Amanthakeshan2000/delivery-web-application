import React, { useState } from 'react';
import '../css/Auth.css';

const SignIn = ({ onClose, switchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    // Handle sign-in logic here
  };

  return (
    <div className="auth-overlay">
      <div className="auth-container">
        <button className="auth-close-btn" onClick={onClose}>&times;</button>
        <h2 className="text-3xl font-bold mb-6 text-center text-Blue decoration-wavy  ">
  Sign In
</h2>

        <form onSubmit={handleSignIn}>
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
          <button type="submit" className="auth-submit-btn bg-blue-500">Sign In</button>
        </form>
        <p className="auth-switch">
          Don't have an account? <span onClick={switchToRegister}>Register</span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
