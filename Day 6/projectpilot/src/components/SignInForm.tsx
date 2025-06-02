import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 
interface SignInFormProps {
  onClose: () => void;
  onAuthSuccess: () => void;
}
 
const SignInForm = ({ onClose, onAuthSuccess }: SignInFormProps) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/signin', form);
      const token = response.data.accessToken;
      localStorage.setItem('accessToken', token);
      console.log(localStorage.getItem('accessToken'));
      onAuthSuccess();  // actualiza el estado de autenticación
      onClose();        // cierra el modal
      navigate('/projects');
    } catch (error) {
      alert('Sign in failed');
    }
  };
 
  return (
<form onSubmit={handleSubmit} className="p-4 border rounded shadow-md w-80 mx-auto mt-4 bg-white">
<h2 className="text-lg font-semibold mb-2">Sign In</h2>
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
        Sign In
</button>
</form>
  );
};
 
export default SignInForm;