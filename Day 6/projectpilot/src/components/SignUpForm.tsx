
import { useState } from 'react';
import axios from 'axios';
 
interface SignUpFormProps {
  onClose: () => void;
}
 
const SignUpForm = ({ onClose }: SignUpFormProps) => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/auth/signup', form);
      onClose();
    } catch (error) {
      alert('Sign up failed');
    }
  };
 
  return (
<form onSubmit={handleSubmit} className="p-4 border rounded shadow-md w-80 mx-auto mt-4 bg-white">
<h2 className="text-lg font-semibold mb-2">Sign Up</h2>
<input
        type="text"
        placeholder="Name"
        className="block w-full mb-2 p-2 border rounded"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
<input
        type="email"
        placeholder="Email"
        className="block w-full mb-2 p-2 border rounded"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
<input
        type="password"
        placeholder="Password"
        className="block w-full mb-4 p-2 border rounded"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />
<button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
        Sign Up
</button>
</form>
  );
};
 
export default SignUpForm;