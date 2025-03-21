// _layout.tsx
import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Stack, Slot } from "expo-router";
import SplashScreenView from "./components/SplashScreenView"; // juster stien etter behov
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "@/lib/context/LanguageContext";

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // La splash-skjermen vises i 3 sekunder før du går videre
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreenView />;
  }

  return (
    <ThemeProvider>
      <LanguageProvider>
        {/* Add the LanguageProvider here */}
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="add" options={{ title: "Add Contact" }} />
        </Stack>
      </LanguageProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B2C41",
  },
});
