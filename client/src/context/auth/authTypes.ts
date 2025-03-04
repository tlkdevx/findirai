export interface AuthState {
    token: string | null;
    isAuthenticated: boolean | null;
    loading: boolean;
    user: any;
    error: any;
  }
  
  export interface AuthAction {
    type: string;
    payload?: any;
  }