import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Animated,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useRef } from "react";
import { useContacts } from "../../lib/data/contacts";
import CallButton from "../components/CallButton";

const logoUri =
  "https://upload.wikimedia.org/wikipedia/commons/c/ca/Teenage_Mutant_Ninja_Turtles_Mutant_Mayhem_Logo.png";

const Favourites = () => {
  const { contacts, toggleFavorite } = useContacts();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const isVisible = useRef(false);

  const handlePress = () => {
    isVisible.current = !isVisible.current;

    Animated.timing(fadeAnim, {
      toValue: isVisible.current ? 1 : 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const favoriteContacts = contacts.filter((contact) => contact.isFavorite);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Image source={{ uri: logoUri }} style={styles.logo} />

        {favoriteContacts.length === 0 ? (
          <Text >No favorites added</Text>
        ) : (
          <FlatList
            data={favoriteContacts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.contactItem}>
                <Text style={styles.contactName}>{item.name}</Text>
                <Text style={styles.contactPhone}>{item.phone}</Text>
              </View>
            )}
          />
        )}
      </Animated.View>

      <Pressable style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>
          {isVisible.current ? "Hide Favorites" : "Show Favorites"}
        </Text>
      </Pressable>
    </View>
  );
};

export default Favourites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 20,
  },
  logo: {
    width: 305,
    height: 159,
    alignSelf: "center",
    marginBottom: 20,
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
  favoriteButton: {
    marginLeft: 10,
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
