import React, { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create a context for theme
export const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
});

// Theme provider component
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemColorScheme = useColorScheme(); // Detects system theme
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === "dark");

  // Load saved theme from AsyncStorage when app starts
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("darkMode");
        if (savedTheme !== null) {
          setIsDarkMode(savedTheme === "true");
        }
      } catch (error) {
        console.error("Failed to load theme:", error);
      }
    };
    loadTheme();
  }, []);

  // Function to toggle dark mode and save to AsyncStorage
  const toggleTheme = async () => {
    try {
      const newDarkMode = !isDarkMode;
      setIsDarkMode(newDarkMode);
      await AsyncStorage.setItem("darkMode", newDarkMode.toString());
    } catch (error) {
      console.error("Failed to save theme:", error);
    }
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

// ✅ Export as default
export default ThemeProvider;
