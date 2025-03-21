import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useTheme } from "../context/ThemeContext"; // Import Theme Context

export default function TabsLayout() {
  const { isDarkMode } = useTheme(); // Access dark mode state

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDarkMode ? "#121212" : "#FFFFFF", // Dark mode background
          borderTopColor: isDarkMode ? "#1E1E1E" : "#E0E0E0",
        },
        tabBarActiveTintColor: isDarkMode ? "#00FF00" : "#007AFF", // Change icon color
        tabBarInactiveTintColor: isDarkMode ? "#888888" : "#777777",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Ninja Contacts",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="ninja" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="favourites"
        options={{
          title: "Ninja Favorites",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="turtle" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
