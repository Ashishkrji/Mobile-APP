export interface AuthState {
  isOnboarded: boolean;
  biometricEnabled: boolean;
}

export interface RootState {
  auth: AuthState;
}
