import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function Input({ password, onFocus, ...props }) {
  const [isShownPassword, setIsShownPassword] = useState(password);
  const [isInFocus, setIsInFocus] = useState(false);

  return (
    <View>
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
        secureTextEntry={isShownPassword}
        {...props}
      />
      {password && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setIsShownPassword(!isShownPassword)}
          style={styles.showPassBtn}
        >
          <Text style={styles.showPassBtnText}>
            {!isShownPassword ? "hide password" : "show password"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: 0.8,
    marginBottom: 16,
    padding: 15,
    width: "100%",
  },
  showPassBtn: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    position: "absolute",
    top: "20%",
    right: 20,
  },
  showPassBtnText: {
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: 0.7,
  },
});
