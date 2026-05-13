'use client';

import { useEffect, ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { login, setLoading } from './features/auth/authSlice';
import { useGetMeQuery } from './api/apiSlice';

interface AuthProviderProps {
  children: ReactNode;
  token?: string;
}

export function AuthProvider({ children, token }: AuthProviderProps) {
  const dispatch = useDispatch();
  
  // Use RTK Query to fetch user data if a token exists
  // The token is passed to headers automatically via apiSlice's prepareHeaders
  // because we will also manually set the token in Redux state below
  const { data: userData, isLoading, isError, isSuccess } = useGetMeQuery(undefined, {
    skip: !token, // Skip the query if no token is provided
  });

  useEffect(() => {
    if (token) {
      dispatch(setLoading(true));
      
      // If we have a token, we at least set the token in state immediately
      // This allows prepareHeaders in apiSlice to use it for the getMe call
      if (!userData) {
          // Temporarily set token so subsequent API calls (like getMe) can use it
          dispatch(login({ user: { user_id: '', user_role: '' }, token }));
      }
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (isSuccess && userData && token) {
      // Once user data is fetched successfully, update Redux with full info
      dispatch(login({ 
        user: userData, 
        token 
      }));
      dispatch(setLoading(false));
    }
    
    if (isError) {
      dispatch(setLoading(false));
    }
  }, [isSuccess, userData, token, isError, dispatch]);

  return <>{children}</>;
}
