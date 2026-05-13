'use client';

import { Provider } from 'react-redux';
import { store } from './store';
import { AuthProvider } from './auth-provider';

export function ReduxProvider({ 
  children, 
  token 
}: { 
  children: React.ReactNode;
  token?: string;
}) {
  return (
    <Provider store={store}>
      <AuthProvider token={token}>
        {children}
      </AuthProvider>
    </Provider>
  );
}
