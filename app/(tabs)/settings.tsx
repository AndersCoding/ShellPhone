// Alternative: Segmented Control for Language Selection
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Switch,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "@/app/context/LanguageContext";

const Settings = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { language, setLanguage, translations } = useLanguage();

  const languages = [
    { code: "en", name: "EN" },
    { code: "no", name: "NO" },
    { code: "es", name: "ES" },
  ];

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#121212" : "#F2F2F2" },
      ]}
    >
      {/* Profile Section */}
      <View style={[styles.profile]}>
        <View style={styles.profileAvatarWrapper}>
          <Image
            source={{
              uri: "https://static.wikia.nocookie.net/muppet/images/0/0b/Leonardo.jpg/revision/latest?cb=20061104044148g",
            }}
            style={styles.profileAvatar}
          />
          <TouchableOpacity style={styles.editButton}>
            <Feather name="edit-3" size={14} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text
          style={[
            styles.profileName,
            { color: isDarkMode ? "#FFFFFF" : "#414d63" },
          ]}
        >
          Leonardo
        </Text>
        <Text
          style={[
            styles.profileAddress,
            { color: isDarkMode ? "#AAAAAA" : "#989898" },
          ]}
        >
          The Sewers
        </Text>
      </View>

      {/* Settings List */}
      <ScrollView>
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              { color: isDarkMode ? "#AAAAAA" : "#9e9e9e" },
            ]}
          >
            {translations.preferences}
          </Text>

          {/* Dark Mode */}
          <View
            style={[
              styles.settingRow,
              { backgroundColor: isDarkMode ? "#1E1E1E" : "#FFFFFF" },
            ]}
          >
            <View
              style={[styles.iconContainer, { backgroundColor: "#007afe" }]}
            >
              <Feather name="moon" size={20} color="#fff" />
            </View>
            <Text
              style={[
                styles.settingLabel,
                { color: isDarkMode ? "white" : "black" },
              ]}
            >
              {translations.darkMode}
            </Text>
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{ false: "#ccc", true: "#007AFF" }}
              thumbColor={isDarkMode ? "#FFFFFF" : "#FFFFFF"}
            />
          </View>

          {/* Language Selection - Segmented Control */}
          <View
            style={[
              styles.settingRow,
              { backgroundColor: isDarkMode ? "#1E1E1E" : "#FFFFFF" },
            ]}
          >
            <View
              style={[styles.iconContainer, { backgroundColor: "#FF9500" }]}
            >
              <Feather name="globe" size={20} color="#fff" />
            </View>
            <Text
              style={[
                styles.settingLabel,
                { color: isDarkMode ? "white" : "black" },
              ]}
            >
              {translations.language}
            </Text>
            <View style={styles.segmentedControl}>
              {languages.map((lang) => (
                <TouchableOpacity
                  key={lang.code}
                  style={[
                    styles.segmentButton,
                    language === lang.code && styles.segmentButtonActive,
                    {
                      backgroundColor: isDarkMode
                        ? language === lang.code
                          ? "#007AFF"
                          : "#333333"
                        : language === lang.code
                        ? "#007AFF"
                        : "#F0F0F0",
                    },
                  ]}
                  onPress={() => setLanguage(lang.code as "en" | "no" | "es")}
                >
                  <Text
                    style={[
                      styles.segmentButtonText,
                      language === lang.code && styles.segmentButtonTextActive,
                      {
                        color:
                          language === lang.code
                            ? "#FFFFFF"
                            : isDarkMode
                            ? "#FFFFFF"
                            : "#000000",
                      },
                    ]}
                  >
                    {lang.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Rest of your settings... */}
          {/* Email Notifications */}
          <View
            style={[
              styles.settingRow,
              { backgroundColor: isDarkMode ? "#1E1E1E" : "#FFFFFF" },
            ]}
          >
            <View
              style={[styles.iconContainer, { backgroundColor: "#38C959" }]}
            >
              <Feather name="at-sign" size={20} color="#fff" />
            </View>
            <Text
              style={[
                styles.settingLabel,
                { color: isDarkMode ? "white" : "black" },
              ]}
            >
              {translations.emailNotifications}
            </Text>
            <Switch
              trackColor={{ false: "#ccc", true: "#007AFF" }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* Push Notifications */}
          <View
            style={[
              styles.settingRow,
              { backgroundColor: isDarkMode ? "#1E1E1E" : "#FFFFFF" },
            ]}
          >
            <View
              style={[styles.iconContainer, { backgroundColor: "#38C959" }]}
            >
              <Feather name="bell" size={20} color="#fff" />
            </View>
            <Text
              style={[
                styles.settingLabel,
                { color: isDarkMode ? "white" : "black" },
              ]}
            >
              {translations.pushNotifications}
            </Text>
            <Switch
              trackColor={{ false: "#ccc", true: "#007AFF" }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Resources section */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              { color: isDarkMode ? "#AAAAAA" : "#9e9e9e" },
            ]}
          >
            {translations.resources}
          </Text>

          <TouchableOpacity
            style={[
              styles.settingRow,
              { backgroundColor: isDarkMode ? "#1E1E1E" : "#FFFFFF" },
            ]}
          >
            <View
              style={[styles.iconContainer, { backgroundColor: "#8e8d91" }]}
            >
              <Feather name="flag" size={20} color="#fff" />
            </View>
            <Text
              style={[
                styles.settingLabel,
                { color: isDarkMode ? "white" : "black" },
              ]}
            >
              {translations.reportBug}
            </Text>
            <Feather name="chevron-right" size={20} color="#C6C6C6" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.settingRow,
              { backgroundColor: isDarkMode ? "#1E1E1E" : "#FFFFFF" },
            ]}
          >
            <View
              style={[styles.iconContainer, { backgroundColor: "#007afe" }]}
            >
              <Feather name="mail" size={20} color="#fff" />
            </View>
            <Text
              style={[
                styles.settingLabel,
                { color: isDarkMode ? "white" : "black" },
              ]}
            >
              {translations.contactUs}
            </Text>
            <Feather name="chevron-right" size={20} color="#C6C6C6" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  // Keep your existing styles...
  container: {
    flex: 1,
  },
  profile: {
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  profileAvatarWrapper: {
    position: "relative",
  },
  profileAvatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  editButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#007AFF",
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  profileName: {
    fontSize: 22,
    fontWeight: "600",
    marginTop: 10,
  },
  profileAddress: {
    fontSize: 14,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 15,
  },
  sectionTitle: {
    paddingVertical: 10,
    fontSize: 14,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1.1,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  settingLabel: {
    fontSize: 18,
    flex: 1,
  },

  // New styles for segmented control
  segmentedControl: {
    flexDirection: "row",
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  segmentButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  segmentButtonActive: {
    backgroundColor: "#007AFF",
  },
  segmentButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
  segmentButtonTextActive: {
    color: "white",
  },
});
