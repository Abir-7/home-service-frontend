import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api', // Adjust base URL as needed
    prepareHeaders: (headers, { getState }) => {
      // 1. Get the token from the auth state
      const token = (getState() as RootState).auth.token;

      // 2. If token exists, add it to the headers
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => '/users/me', // Adjust this endpoint to match your backend
      providesTags: ['Auth'],
    }),
  }),
});

export const { useGetMeQuery } = apiSlice;
