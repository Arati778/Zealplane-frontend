import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: '',
    favoriteColor: '',
    newPassword: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, favoriteColor, newPassword, confirmPassword } = formData;

    if (newPassword !== confirmPassword) {
      toast.error('New password and confirmation password do not match.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/reset-password',
        { email, favoriteColor, newPassword }
      );

      if (response.data.success) {
        toast.success('Password has been updated successfully!');
        navigate('/login');
      } else {
        toast.error(response.data.message || 'Failed to update password.');
      }
    } catch (error) {
      toast.error('Error updating password. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="forgot-password-wrapper">
      <h1 className="heading">Reset Your Password</h1>
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Favorite Color</label>
          <input
            type="text"
            name="favoriteColor"
            className="form-control"
            placeholder="Enter your favorite color"
            value={formData.favoriteColor}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            name="newPassword"
            className="form-control"
            placeholder="Enter your new password"
            value={formData.newPassword}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            className="form-control"
            placeholder="Confirm your new password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Update Password
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;














