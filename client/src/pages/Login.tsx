import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../context/auth/authContext';

const Login: React.FC = () => {
  const authContext = useContext(AuthContext);
  const { login, error, clearErrors, isAuthenticated } = authContext;

  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/dashboard');
    }

    if (error) {
      alert(error);
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, history]);

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === '' || password === '') {
      alert('Please fill in all fields');
    } else {
      login({ email, password });
    }
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Login;