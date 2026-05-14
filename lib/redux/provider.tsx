'use client';

import { Provider } from 'react-redux';
import { store } from './store';
import { AuthProvider } from './auth-provider';

export function ReduxProvider({ 
  children, 
  token,
  role
}: { 
  children: React.ReactNode;
  token?: string;
  role?: string;
}) {
  return (
    <Provider store={store}>
      <AuthProvider token={token} role={role}>
        {children}
      </AuthProvider>
    </Provider>
  );
}
