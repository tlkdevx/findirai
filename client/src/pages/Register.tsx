import React, { useState, useContext } from 'react';
import AuthContext from '../context/auth/authContext';

const Register: React.FC = () => {
  const authContext = useContext(AuthContext);
  const { register } = authContext;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register({ name, email, password });
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="name" value={name} onChange={onChange} placeholder="Name" required />
      <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
      <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;