import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { Asset } from "expo-asset";

// Forhindre at splash-skjermen skjules automatisk
SplashScreen.preventAutoHideAsync();

export default function SplashScreenView() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function loadResourcesAndData() {
      try {
        // Last inn splash-ikonet (sørg for at stien stemmer med din prosjektstruktur)
        await Asset.loadAsync(require("../../assets/images/IconNoBackground.png"));
        // Her kan du laste inn andre ressurser om nødvendig
      } catch (error) {
        console.warn("Feil under lasting av ressurser:", error);
      } finally {
        setIsReady(true);
        // Når alt er klart, skjul splash-skjermen
        await SplashScreen.hideAsync();
      }
    }
    loadResourcesAndData();
  }, []);

  // Returner ingenting mens vi laster (kan også vise en loader om ønskelig)
  if (!isReady) {
    return null;
  }

  // Når alt er klart, vis splash-bildet (eller eventuelt din hoved-app)
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/IconNoBackground.png")}
        style={styles.image}
        resizeMode="contain"
      />
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200, // Juster størrelsen etter behov
    height: 200,
  },
});
