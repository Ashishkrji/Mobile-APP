import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  isLocked: boolean;
  isOnboarded: boolean;
  biometricEnabled: boolean;
}

const initialState: AuthState = {
  isLocked: false,
  isOnboarded: false,
  biometricEnabled: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    lock: (state) => {
      state.isLocked = true;
    },
    unlock: (state) => {
      state.isLocked = false;
    },
    setOnboarded: (state, action: { payload: boolean }) => {
      state.isOnboarded = action.payload;
    },
    setBiometricEnabled: (state, action: { payload: boolean }) => {
      state.biometricEnabled = action.payload;
    },
  },
});

export const { lock, unlock, setOnboarded, setBiometricEnabled } = authSlice.actions;
export default authSlice.reducer;
