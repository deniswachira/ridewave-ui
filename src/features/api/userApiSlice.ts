import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserRegisterFormValues } from '../../types/Types';
import { UserLoginFormValues } from '../../types/Types';
import { TUser } from '../../types/Types';
import { apiDomain } from '../../proxxy/proxxy';


export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiDomain }),
  tagTypes: ['users', 'user'],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials: UserLoginFormValues, ) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    registerUser: builder.mutation<TUser,Partial<TUser>>({
      query: (userRegisterPayload: UserRegisterFormValues)=> ({
        url: 'auth/register',
        method: 'POST',
        body: userRegisterPayload,
      }),
    }),
    getUsersProfiles: builder.query({
      query: () => 'users',
      providesTags: ["users"]
    }),
    getUserProfile: builder.query({
      query: (userId: number) => `users/${userId}`,  
      providesTags: ["user"]    
    }),
    updateUserProfile: builder.mutation<TUser,Partial<TUser>>({
      query: ({ user_id, ...patch }) => ({
        url: `users/${user_id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: ["user"]
    }),
    deleteUserProfile: builder.mutation({
      query: (user_id) => ({
        url: `users/${user_id}`,
        method: 'DELETE',
      }),
  }),
}),
});



// Export the auto-generated hooks for each endpoint
// export default userApi;

