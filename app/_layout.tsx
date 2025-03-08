import React from "react";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* Tabs Navigation */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* Other Screens */}
      <Stack.Screen name="add" options={{ title: "Add Contact" }} />
    </Stack>
  );
}
