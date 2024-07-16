import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { userApi } from '../features/api/userApiSlice';
import { carApi } from '../features/api/carApiSlice';
import { bookingApi } from '../features/api/bookingApiSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

// Create a persist config for the bookingApi slice
const bookingPersistConfig = {
  key: 'booking',
  storage,
  whitelist: [bookingApi.reducerPath], // only persist bookingApi
};

// Create a persisted reducer for the bookingApi slice
const persistedBookingReducer = persistReducer(bookingPersistConfig, bookingApi.reducer);


export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [carApi.reducerPath]: carApi.reducer,
    [bookingApi.reducerPath]: persistedBookingReducer, // Use the persisted reducer here
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, //  to avoid serialization errors with redux-persist
    }).concat(userApi.middleware, carApi.middleware, bookingApi.middleware), // Don't forget to include the bookingApi middleware
});

// Export the persisted store
export const persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
