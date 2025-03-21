import React from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
  SafeAreaView,
} from "react-native";
import { useContacts } from "../../lib/data/contacts";
import CallButton from "../components/CallButton";
import { Link } from "expo-router";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "@/lib/context/LanguageContext";

const noContacts = require("@/assets/images/noContacts.png");

export default function Index() {
  const { contacts, deleteContact, toggleFavorite } = useContacts();
  const { isDarkMode } = useTheme();
  const { translations } = useLanguage(); // Get translations

  const handleDelete = (id: number) => {
    Alert.alert(
      translations.deleteContact, // Use translated text
      translations.deleteConfirmation, // Use translated text
      [
        { text: translations.cancel, style: "cancel" }, // Use translated text
        {
          text: translations.delete, // Use translated text
          onPress: () => deleteContact(id),
          style: "destructive",
        },
      ]
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#121212" : "#F2F2F2" },
      ]}
    >
      {/* Add extra space at the top */}
      <View style={{ height: 10 }} />

      {contacts.length === 0 ? (
        <View style={styles.noContactsContainer}>
          <Image source={noContacts} style={styles.noContactsImage} />
          <Text
            style={[
              styles.noContactsText,
              { color: isDarkMode ? "#FFFFFF" : "#000000" },
            ]}
          >
            {translations.noContactsFound} {/* Use translated text */}
          </Text>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={{ paddingTop: 20 }}
          data={contacts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={[
                styles.contactItem,
                { backgroundColor: isDarkMode ? "#1E1E1E" : "#FFFFFF" },
              ]}
            >
              <TouchableOpacity
                onPress={() => toggleFavorite(item.id)}
                style={styles.favoriteButton}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: isDarkMode ? "white" : "black",
                  }}
                >
                  {item.isFavorite ? "⭐" : "☆"}
                </Text>
              </TouchableOpacity>
              <View style={styles.contactInfo}>
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
              <CallButton phoneNumber={item.phone} />
              <TouchableOpacity
                onPress={() => handleDelete(item.id)}
                style={styles.deleteButton}
              >
                <Text style={styles.deleteText}>🗑️</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {/* Navigation Squares */}
      <View style={styles.navigationContainer}>
        {/* Map Button */}
        <Link href="../components/map" asChild>
          <TouchableOpacity
            style={[
              styles.navigationButton,
              {
                backgroundColor: isDarkMode ? "#007AFF" : "#1E90FF",
              },
            ]}
          >
            <Text style={styles.navigationIcon}>🗺️</Text>
            <Text
              style={[
                styles.navigationButtonText,
                { color: isDarkMode ? "white" : "black" },
              ]}
            >
              {translations.map} {/* Use translated text */}
            </Text>
          </TouchableOpacity>
        </Link>

        {/* Ninja Quiz Button */}
        <Link href="../components/ninjaQuiz" asChild>
          <TouchableOpacity
            style={[
              styles.navigationButton,
              {
                backgroundColor: isDarkMode ? "#32CD32" : "#28A745",
              },
            ]}
          >
            <Text style={styles.navigationIcon}>🥋</Text>
            <Text
              style={[
                styles.navigationButtonText,
                { color: isDarkMode ? "white" : "black" },
              ]}
            >
              {translations.ninjaQuiz} {/* Use translated text */}
            </Text>
          </TouchableOpacity>
        </Link>
      </View>

      {/* Add Contact Button */}
      <Link
        href="/add"
        style={[styles.addContactButton, isDarkMode && { color: "white" }]}
      >
        ➕ {translations.addContact} {/* Use translated text */}
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  favoriteButton: {
    marginLeft: 10,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 6,
  },
  deleteText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  noContactsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noContactsImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 10,
  },
  noContactsText: {
    fontSize: 18,
  },
  contactItem: {
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
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: "600",
  },
  contactPhone: {
    fontSize: 14,
  },
  addContactButton: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  /** New Styles for Navigation Squares */
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  navigationButton: {
    width: 120,
    height: 120,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 15,
    elevation: 3,
  },
  navigationIcon: {
    fontSize: 40, // Make icon large
    marginBottom: 5, // Space between icon and text
  },
  navigationButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
