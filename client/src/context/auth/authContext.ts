import { createContext } from 'react';
import { AuthState } from './authTypes';

interface AuthContextProps extends AuthState {
  register: (formData: any) => Promise<{ data: any }>; // Ensuring register returns an object with a data property
  loadUser: () => Promise<void>;
  login: (formData: any) => Promise<{ data: any }>; // Ensuring login returns an object with a data property
  logout: () => void;
  clearErrors: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  token: null,
  isAuthenticated: null,
  loading: true,
  user: null,
  error: null,
  register: async () => ({ data: null }), // Default implementation returning an object with data
  loadUser: async () => {},
  login: async () => ({ data: null }), // Default implementation returning an object with data
  logout: () => {},
  clearErrors: () => {}
});

export default AuthContext;