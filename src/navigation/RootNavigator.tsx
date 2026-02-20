import React from 'react';
import { Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const PlaceholderScreen = ({ label }: { label: string }) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>{label}</Text>
  </View>
);

const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding">{() => <PlaceholderScreen label="Onboarding Screen" />}</Stack.Screen>
      <Stack.Screen name="Auth">{() => <PlaceholderScreen label="Auth Screen" />}</Stack.Screen>
      <Stack.Screen name="Main">{() => <PlaceholderScreen label="Main Tabs" />}</Stack.Screen>
    </Stack.Navigator>
  );
};

export default RootNavigator;
