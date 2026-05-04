import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Input, Logo } from '../components/common';
import { useAuth } from '../context/AuthContext';
import AuthDisclaimer from '../components/ui/AuthDisclaimer';

const SignIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const result = await login(formData.email, formData.password);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setErrors({ general: result.error });
    }
  };

  return (
    <div className="cb-auth-page">
      {/* Coinbase logo */}
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Logo size={22} className="cb-auth-logo" />
      </Link>

      <div className="cb-auth-center">
        <Card className="cb-auth-card">
          <h1>Sign in to Crypto App</h1>
          <AuthDisclaimer />

          <form onSubmit={handleSubmit}>
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email address"
              error={errors.email}
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Your password"
              error={errors.password}
            />

            {errors.general && (
              <div className="cb-error-message">{errors.general}</div>
            )}

            <Button type="submit" className="cb-btn-primary" loading={isLoading}>
              Sign In
            </Button>
          </form>

          <div className="cb-auth-divider">OR</div>

          <button className="cb-provider">
            <i className="bi bi-person" />
            Sign in with Passkey
          </button>

          <button className="cb-provider">
            <i className="bi bi-google" />
            Sign in with Google
          </button>

          <button className="cb-provider">
            <i className="bi bi-apple" />
            Sign in with Apple
          </button>

          <p className="cb-auth-footer">
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;