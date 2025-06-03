import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

interface SignInFormProps {
  onClose: () => void;
  onAuthSuccess: () => void;
}

const SignInForm = ({ onClose, onAuthSuccess }: SignInFormProps) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.email) newErrors.email = "Email is required";
    else if (!emailRegex.test(form.email))
      newErrors.email = "Invalid email format";

    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/signin",
        form
      );
      const token = response.data.accessToken;
      localStorage.setItem("accessToken", token);
      onAuthSuccess();
      navigate("/projects");
      onClose();
    } catch (error) {
      setServerError("Invalid credentials or server error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signin-form">
      <h2>Sign In</h2>

      {serverError && <div className="error-message">{serverError}</div>}

      <div className="form-group">
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={errors.email ? "input-error" : ""}
        />
        {errors.email && <span className="error-text">{errors.email}</span>}
      </div>

      <div className="form-group">
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className={errors.password ? "input-error" : ""}
        />
        {errors.password && (
          <span className="error-text">{errors.password}</span>
        )}
      </div>

      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignInForm;
