import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum UserRole {
  CUSTOMER = 'customer',
  CLEANER = 'cleaner',
  MANAGER = 'manager',
  ADMIN = 'admin',
}

interface User {
  user_email?: string;
  user_role: UserRole;
  full_name?: string;
  user_id: string;
  user_image?: string;
}

interface AuthState {
  is_loading: boolean;
  token: string | null;
  user: User | null;
}

const initialState: AuthState = {
  is_loading: false,
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.is_loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.is_loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.is_loading = action.payload;
    },
  },
});

export const { login, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
