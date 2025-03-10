import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../context/auth/authContext";

interface AxiosError extends Error {
  response?: {
    data: any;
  };
}

const Login: React.FC = () => {
  const { login, error, clearErrors, isAuthenticated } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/dashboard");
    }
    if (error) {
      alert(error);
      clearErrors();
    }
  }, [error, isAuthenticated, history]);

  const [user, setUser] = useState({ email: "", password: "" });
  const { email, password } = user;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    try {
      const res = await login({ email, password });
      if (res && res.data) {
        console.log(res.data); // Token received from the server
      } else {
        console.error("Login response data is undefined");
      }
    } catch (error: unknown) {
      // Safely check for error.response.data using a type guard
      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error
      ) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          console.error(axiosError.response.data);
        } else {
          console.error("Axios error response undefined", error);
        }
      } else {
        console.error(error);
      }
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