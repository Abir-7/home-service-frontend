'use client';

import { useEffect, ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { login, setLoading, UserRole } from './features/auth/authSlice';
import { useGetMeQuery } from './api/apiSlice';

interface AuthProviderProps {
  children: ReactNode;
  token?: string;
}

export function AuthProvider({ children, token }: AuthProviderProps) {
  const dispatch = useDispatch();
  
  // Use RTK Query to fetch user data if a token exists
  const { data: userData, isError, isSuccess } = useGetMeQuery(undefined, {
    skip: !token, // Skip the query if no token is provided
  });

  useEffect(() => {
    if (token) {
      dispatch(setLoading(true));
      
      // If we have a token, set it immediately so RTK Query can use it in headers
      if (!userData) {
          dispatch(login({ user: { user_id: '', user_role: UserRole.CUSTOMER }, token }));
      }
    }
  }, [token, dispatch, userData]);

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
