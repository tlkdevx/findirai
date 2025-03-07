import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', formData);
      console.log(res.data); // Token received from the server
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <input type="email" name="email" value={email} onChange={onChange} required />
      </div>
      <div>
        <input type="password" name="password" value={password} onChange={onChange} required />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;