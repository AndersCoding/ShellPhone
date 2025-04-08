import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import newyorkBackground from "../../assets/images/pixelNewYork.jpg";
import mikey from "../../assets/images/michaelangelo.png";

const NinjaMap = () => {
  const [mikeyFound, setMikeyFound] = useState(false);

  const pressMikey = () => {
    console.log("Mikey found!");
    setMikeyFound(true);
    Alert.alert("You found Mikey!", "Cowabunga dude! You found Michelangelo!", [
      { text: "Awesome!", onPress: () => console.log("OK Pressed") },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        maximumZoomScale={3}
        minimumZoomScale={1}
        contentContainerStyle={styles.scrollContainer}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <View style={styles.imageContainer}>
            <Image source={newyorkBackground} style={styles.image} />

            {/* Mikey hidden in the image */}
            {!mikeyFound && (
              <TouchableOpacity
                style={[
                  styles.hiddenCharacter,
                  {
                    // Adjust these values to position Mikey where you want
                    left: 1450, // X position on the background
                    top: 750, // Y position on the background
                  },
                ]}
                onPress={pressMikey}
                activeOpacity={1} // Makes it invisible to touch feedback
              >
                <Image source={mikey} style={styles.mikeyImage} />
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default NinjaMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black", // Background color around the image
  },
  scrollContainer: {
    flexGrow: 1,
  },
  imageContainer: {
    position: "relative", // Important for absolute positioning of children
  },
  image: {
    width: 2200, // or whatever matches the image's actual dimensions
    height: 1200,
    resizeMode: "cover",
  },
  hiddenCharacter: {
    position: "absolute",
    width: 50, // Adjust size as needed
    height: 50, // Adjust size as needed
    // No background color so it's invisible except for the image
  },
  mikeyImage: {
    width: "300%",
    height: "300%",
    resizeMode: "contain",
  },
});
