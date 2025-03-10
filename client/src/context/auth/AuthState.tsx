import React, { useReducer, ReactNode } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../types';

interface AuthStateProps {
  children: ReactNode;
}

const AuthState: React.FC<AuthStateProps> = ({ children }) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get('/api/auth');

      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Register User
  const register = async (formData: any): Promise<{ data: any }> => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/users/register', formData, config);

      dispatch({ type: REGISTER_SUCCESS, payload: res.data });

      await loadUser();
      
      return { data: res.data };
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg });
      } else {
        dispatch({ type: REGISTER_FAIL, payload: 'An error occurred' });
      }

      throw err; // Re-throw the error to ensure the function returns a rejected Promise
    }
  };

  // Login User
  const login = async (formData: any): Promise<{ data: any }> => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/auth/login', formData, config);

      dispatch({ type: LOGIN_SUCCESS, payload: res.data });

      await loadUser();
      
      return { data: res.data };
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        dispatch({ type: LOGIN_FAIL, payload: err.response.data.msg });
      } else {
        dispatch({ type: LOGIN_FAIL, payload: 'An error occurred' });
      }

      throw err; // Re-throw the error to ensure the function returns a rejected Promise
    }
  };

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        loadUser,
        login,
        logout,
        clearErrors
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;