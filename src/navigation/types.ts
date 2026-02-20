export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Auth:
    | {
        preferredMethod: 'biometric' | 'credentials';
      }
    | undefined;
  Main: undefined;
};
