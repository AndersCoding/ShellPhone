import React from "react";
import { TouchableOpacity, Text, Linking, StyleSheet } from "react-native";

interface CallButtonProps {
  phoneNumber: string;
}

const CallButton: React.FC<CallButtonProps> = ({ phoneNumber }) => {
  const triggerCall = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <TouchableOpacity onPress={triggerCall} style={styles.button}>
      <Text style={styles.text}>📞 Call</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CallButton;
