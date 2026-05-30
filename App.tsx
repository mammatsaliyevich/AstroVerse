import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/theme/ThemeProvider';
import AppNavigator from './src/navigation/AppNavigator';

const navTheme = {
  dark: true,
  colors: {
    primary: '#00d4ff',
    background: '#05010f',
    card: '#0a0a1f',
    text: '#ffffff',
    border: 'rgba(255,255,255,0.12)',
    notification: '#ff006e',
  },
  fonts: {
    regular: { fontFamily: 'System', fontWeight: '400' as const },
    medium: { fontFamily: 'System', fontWeight: '500' as const },
    bold: { fontFamily: 'System', fontWeight: '700' as const },
    heavy: { fontFamily: 'System', fontWeight: '900' as const },
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer theme={navTheme}>
          <StatusBar style="light" />
          <AppNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
