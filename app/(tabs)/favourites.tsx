import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Animated,
  FlatList,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { useContacts } from "../../lib/data/contacts";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "@/lib/context/LanguageContext";

const logoUri =
  "https://upload.wikimedia.org/wikipedia/commons/c/ca/Teenage_Mutant_Ninja_Turtles_Mutant_Mayhem_Logo.png";

const Favourites = () => {
  const { contacts, reloadContacts } = useContacts();
  const { isDarkMode } = useTheme();
  const { translations } = useLanguage(); // Get translations
  const [isVisible, setIsVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  // Get the current favorite contacts
  const favoriteContacts = contacts.filter((contact) => contact.isFavorite);

  // Reload contacts when the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      reloadContacts();
      return () => {};
    }, [reloadContacts])
  );

  // Handle the show/hide button press
  const handlePress = () => {
    const newVisibility = !isVisible;
    setIsVisible(newVisibility);

    Animated.timing(fadeAnim, {
      toValue: newVisibility ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#121212" : "#F2F2F2" },
      ]}
    >
      <Animated.View style={{ opacity: fadeAnim }}>
        <Image source={{ uri: logoUri }} style={styles.logo} />

        {favoriteContacts.length === 0 ? (
          <Text
            style={[
              styles.noFavoritesText,
              { color: isDarkMode ? "#FFFFFF" : "#000000" },
            ]}
          >
            {translations.noFavoritesAdded} {/* Use translated text */}
          </Text>
        ) : (
          <FlatList
            data={favoriteContacts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.contactItem,
                  { backgroundColor: isDarkMode ? "#1E1E1E" : "#FFFFFF" },
                ]}
              >
                <Text
                  style={[
                    styles.contactName,
                    { color: isDarkMode ? "#FFFFFF" : "#000000" },
                  ]}
                >
                  {item.name}
                </Text>
                <Text
                  style={[
                    styles.contactPhone,
                    { color: isDarkMode ? "#AAAAAA" : "#666" },
                  ]}
                >
                  {item.phone}
                </Text>
              </View>
            )}
          />
        )}
      </Animated.View>

      <Pressable style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>
          {
            isVisible
              ? translations.hideFavorites // Use translated text
              : translations.showFavorites // Use translated text
          }
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Favourites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  logo: {
    width: 305,
    height: 159,
    alignSelf: "center",
    marginBottom: 20,
  },
  noFavoritesText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: "#666",
  },
  contactItem: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactName: {
    fontSize: 18,
    fontWeight: "600",
  },
  contactPhone: {
    fontSize: 14,
    color: "gray",
  },
  button: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
