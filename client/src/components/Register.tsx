import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface FormData {
  name: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/users/register', formData);
      console.log(res.data); // Token received from the server
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <input type="text" name="name" value={name} onChange={onChange} required />
      </div>
      <div>
        <input type="email" name="email" value={email} onChange={onChange} required />
      </div>
      <div>
        <input type="password" name="password" value={password} onChange={onChange} required />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;