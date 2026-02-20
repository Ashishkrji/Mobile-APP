import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { Provider } from 'react-redux';

import RootNavigator from './src/navigation/RootNavigator';
import { store } from './src/store';

const appTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FAFAFA',
  },
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer theme={appTheme}>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
}
