
import { useState } from 'react';
import axios from 'axios';
import '../App.css'
 
interface SignUpFormProps {
  onClose: () => void;
}
 
const SignUpForm = ({ onClose }: SignUpFormProps) => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});
  const [serverError, setServerError] = useState('');
 
  const validate = () => {
    const newErrors: { name?: string; email?: string; password?: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 
    if (!form.name) newErrors.name = 'Name is required';
 
    if (!form.email) newErrors.email = 'Email is required';
    else if (!emailRegex.test(form.email)) newErrors.email = 'Invalid email format';
 
    if (!form.password) newErrors.password = 'Password is required';
    else if (form.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';
 
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
 
    try {
      await axios.post('http://localhost:3000/auth/signup', form);
      onClose();
    } catch (error) {
      setServerError('Sign up failed. Please try again.');
    }
  };
 
  return (
<form onSubmit={handleSubmit} className="signup-form">
<h2>Sign Up</h2>
 
      {serverError && <div className="error-message">{serverError}</div>}
 
      <div className="form-group">
<input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={errors.name ? 'input-error' : ''}
        />
        {errors.name && <span className="error-text">{errors.name}</span>}
</div>
 
      <div className="form-group">
<input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={errors.email ? 'input-error' : ''}
        />
        {errors.email && <span className="error-text">{errors.email}</span>}
</div>
 
      <div className="form-group">
<input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className={errors.password ? 'input-error' : ''}
        />
        {errors.password && <span className="error-text">{errors.password}</span>}
</div>
 
      <button type="submit">Sign Up</button>
</form>
  );
};
 
export default SignUpForm;