import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useContacts } from "../lib/data/contacts";
import { useRouter } from "expo-router";
import { useTheme } from "./context/ThemeContext";
import { useLanguage } from "../lib/context/LanguageContext";

const backgroundImage = require("@/assets/images/shellphoneBackground.png");

export default function AddContactScreen() {
  const { addContact } = useContacts();
  const { translations } = useLanguage(); // Get translations
  const { isDarkMode } = useTheme(); // Get dark mode state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter();

  const handleAddContact = async () => {
    if (name.trim() && phone.trim()) {
      await addContact(name, phone);
      router.push("/"); // Navigate back to contact list
    }
  };

  return (
    <ImageBackground
      /* source={backgroundImage} */ style={styles.backgroundImage}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: isDarkMode
              ? "rgba(18, 18, 18, 0.9)"
              : "rgba(255, 255, 255, 0.8)",
          },
        ]}
      >
        <Text
          style={[styles.header, { color: isDarkMode ? "#FFFFFF" : "#000000" }]}
        >
          {translations.addNewContact} {/* Use translated text */}
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: isDarkMode ? "#333333" : "white",
              color: isDarkMode ? "#FFFFFF" : "#000000",
              borderColor: isDarkMode ? "#555555" : "#ccc",
            },
          ]}
          placeholder={translations.enterName} // Use translated text
          placeholderTextColor={isDarkMode ? "#AAAAAA" : "#999999"}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: isDarkMode ? "#333333" : "white",
              color: isDarkMode ? "#FFFFFF" : "#000000",
              borderColor: isDarkMode ? "#555555" : "#ccc",
            },
          ]}
          placeholder={translations.enterPhoneNumber} // Use translated text
          placeholderTextColor={isDarkMode ? "#AAAAAA" : "#999999"}
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
        <TouchableOpacity onPress={handleAddContact} style={styles.button}>
          <Text style={styles.buttonText}>
            {translations.saveContact} {/* Use translated text */}
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // Sørger for at bildet dekker skjermen
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Gjør bakgrunnen litt gjennomsiktig for lesbarhet
    borderRadius: 10,
    margin: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 16,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
