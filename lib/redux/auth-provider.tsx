'use client';

import { useEffect, ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { login, setLoading, UserRole } from './features/auth/authSlice';
import { useGetMeQuery } from './api/apiSlice';

interface AuthProviderProps {
  children: ReactNode;
  token?: string;
  role?: string;
}

export function AuthProvider({ children, token, role }: AuthProviderProps) {
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
          const userRole = (role as UserRole) || UserRole.CUSTOMER;
          dispatch(login({ user: { user_id: 'demo-user', user_role: userRole }, token }));
      }
    }
  }, [token, dispatch, userData, role]);

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
