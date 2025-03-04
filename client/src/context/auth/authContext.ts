import { createContext } from 'react';
import { AuthState } from './authTypes';

interface AuthContextProps extends AuthState {
  register: (formData: any) => Promise<void>;
  loadUser: () => Promise<void>;
  login: (formData: any) => Promise<void>;
  logout: () => void;
  clearErrors: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  token: null,
  isAuthenticated: null,
  loading: true,
  user: null,
  error: null,
  register: async () => {},
  loadUser: async () => {},
  login: async () => {},
  logout: () => {},
  clearErrors: () => {}
});

export default AuthContext;