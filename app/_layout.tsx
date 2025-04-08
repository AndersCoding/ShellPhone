// _layout.tsx
import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Stack } from "expo-router";
import SplashScreenView from "./components/SplashScreenView";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "@/app/context/LanguageContext";
import { GestureHandlerRootView } from "react-native-gesture-handler"; // 👈 denne!

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreenView />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* 👈 pakk hele appen */}
      <ThemeProvider>
        <LanguageProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="add" options={{ title: "Add Contact" }} />
          </Stack>
        </LanguageProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
