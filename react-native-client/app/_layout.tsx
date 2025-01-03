import React, { useContext } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider,useTheme } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { PaperProvider,MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import {MyMD3LightTheme,MyMD3DarkTheme} from '@/themes/MyTheme';
import { useColorScheme } from '@/hooks/useColorScheme';
import RadioConfigContext,{RadioConfigProvider} from '@/contexts/RadioConfigContext';
import { StatusBar } from 'expo-status-bar';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const PaperDefaultTheme = colorScheme === 'dark' ? MyMD3DarkTheme : MyMD3LightTheme;

  const paperTheme = {
    ...PaperDefaultTheme,
  }

  return (
    <PaperProvider theme={paperTheme}>
      <StatusBar />
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RadioConfigProvider value={{type:"static"}}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
          <Stack.Screen name="+not-found" />
        </Stack>
      </RadioConfigProvider>
      </ThemeProvider>
    </PaperProvider>
  );
}
