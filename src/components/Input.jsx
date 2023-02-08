import { useState } from "react";
import {
  StyleSheet,
  // Text,
  // View,
  TextInput,
  // TouchableOpacity,
} from "react-native";

export default function Input({ password, onFocus, ...props }) {
  const [isShownPassword, setIsShownPassword] = useState(password);
  const [isInFocus, setIsInFocus] = useState(false);

  return (
    <TextInput
      textAlign="left"
      onFocus={() => {
        onFocus();
        setIsInFocus(true);
      }}
      onBlur={() => setIsInFocus(false)}
      style={{
        ...styles.textInput,
        borderColor: isInFocus ? "#FF6C00" : "#E8E8E8",
        backgroundColor: isInFocus ? "#FFFFFF" : "#F6F6F6",
      }}
      placeholderTextColor="#BDBDBD"
      secureTextEntry={password}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    color: "#212121",
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 16,
    padding: 15,
    width: "100%",
  },
});
