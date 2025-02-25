import { createContext } from 'react';

interface AuthContextProps {
  token: string | null;
  isAuthenticated: boolean | null;
  loading: boolean;
  user: any;
  error: any;
  register: (formData: any) => void;
  loadUser: () => void;
  login: (formData: any) => void;
  logout: () => void;
  clearErrors: () => void;
}

const authContext = createContext<AuthContextProps>({
  token: null,
  isAuthenticated: null,
  loading: true,
  user: null,
  error: null,
  register: () => {},
  loadUser: () => {},
  login: () => {},
  logout: () => {},
  clearErrors: () => {}
});

export default authContext;