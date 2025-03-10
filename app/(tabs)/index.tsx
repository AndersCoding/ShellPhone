import React from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Image,
} from "react-native";
import { useContacts } from "../../lib/data/contacts";
import CallButton from "../components/CallButton";
import { Link } from "expo-router";

const backgroundImage = require("@/assets/images/shellphoneBackground.png");
const noContacts = require("@/assets/images/noContacts.png");

export default function Index() {
  const { contacts, deleteContact } = useContacts();

  const handleDelete = (id: number) => {
    Alert.alert(
      "Delete Contact",
      "Are you sure you want to delete this contact?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => deleteContact(id),
          style: "destructive",
        },
      ]
    );
  };

  return (
    <ImageBackground /* source={backgroundImage} */ style={styles.backgroundImage}>
      <View style={styles.container}>
        {contacts.length === 0 ? (
          // Hvis det ikke er noen kontakter, vis bildet
          <View style={styles.noContactsContainer}>
            <Image source={noContacts} style={styles.noContactsImage} />
            <Text style={styles.noContactsText}>No contacts found</Text>
          </View>
        ) : (
          // Ellers, vis kontaktlisten
          <FlatList
            data={contacts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.contactItem}>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactName}>{item.name}</Text>
                  <Text style={styles.contactPhone}>{item.phone}</Text>
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

        <Link href="/add" style={styles.addContactButton}>
          ➕ Add Contact
        </Link>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
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
    color: "black",
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
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: "600",
  },
  contactPhone: {
    fontSize: 14,
    color: "gray",
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
  addContactButton: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "blue",
    marginTop: 20,
  },
});
