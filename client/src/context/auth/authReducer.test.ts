import authReducer from './authReducer';
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

describe('authReducer', () => {
  const initialState = {
    token: null,
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };

  it('should handle REGISTER_SUCCESS', () => {
    const action = {
      type: REGISTER_SUCCESS,
      payload: { token: '12345' }
    };

    const expectedState = {
      ...initialState,
      token: '12345',
      isAuthenticated: true,
      loading: false
    };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  // Add more tests for other actions...
});