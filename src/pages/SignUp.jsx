import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Input, Logo } from '../components/common';
import { useAuth } from '../context/AuthContext';
import AuthDisclaimer from '../components/ui/AuthDisclaimer';

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const result = await register(formData.email, formData.password, formData.name);

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
          <h1>Create your account</h1>
          <AuthDisclaimer />

          <form onSubmit={handleSubmit}>
            <Input
              label="Full Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              error={errors.name}
            />

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
              placeholder="Create a password"
              error={errors.password}
            />

            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              error={errors.confirmPassword}
            />

            {errors.general && (
              <div className="cb-error-message">{errors.general}</div>
            )}

            <Button type="submit" className="cb-btn-primary" loading={isLoading}>
              Create Account
            </Button>
          </form>

          <p className="cb-auth-footer">
            Already have an account? <Link to="/signin">Sign in</Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;