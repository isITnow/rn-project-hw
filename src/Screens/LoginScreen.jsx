import { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  // KeyboardAvoidingView,
  Keyboard,
} from "react-native";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen() {
  const [credentials, setCredentials] = useState(initialState);
  const [isShownKeyboard, setIsShownKeyboard] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputHandler = (value, name) => {
    setCredentials((prevState) => ({ ...prevState, [name]: value }));
  };

  const onFocusHandler = () => {
    setIsShownKeyboard(true);
  };

  const keyboardHide = () => {
    setIsShownKeyboard(false);
    Keyboard.dismiss();
  };

  const submitHandler = () => {
    console.log(credentials);
    setCredentials(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/background_2x.jpg")}
          style={styles.image}
        >
          {/* <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "hight"}
          > */}
          <View
            style={{
              ...styles.form,
              paddingBottom: isShownKeyboard ? 20 : 110,
            }}
          >
            <Text style={styles.title}>Log in</Text>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#BDBDBD"
              textAlign="left"
              value={credentials.email}
              onFocus={() => {
                onFocusHandler();
                setIsFocused(true);
              }}
              onBlur={() => setIsFocused(false)}
              onChangeText={(value) => {
                inputHandler(value, "email");
              }}
              style={{
                ...styles.textInput,
                borderColor: isFocused ? "#FF6C00" : "#E8E8E8",
                backgroundColor: isFocused ? "#FFFFFF" : "#F6F6F6",
              }}
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#BDBDBD"
              textAlign="left"
              value={credentials.password}
              secureTextEntry={true}
              onFocus={() => {
                onFocusHandler();
                setIsFocused(true);
              }}
              onBlur={() => setIsFocused(false)}
              onChangeText={(value) => {
                inputHandler(value, "password");
              }}
              // style={styles.textInput}
              style={{
                ...styles.textInput,
                borderColor: isFocused ? "#FF6C00" : "#E8E8E8",
                backgroundColor: isFocused ? "#FFFFFF" : "#F6F6F6",
              }}
            />
            {!isShownKeyboard && (
              <>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={submitHandler}
                  style={styles.registerBtn}
                >
                  <Text style={styles.registerBtnText}>Sign up</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => console.log("Click")}
                  style={styles.redirectBtn}
                >
                  <Text style={styles.redirectText}>
                    Have no account? Register
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
          {/* </KeyboardAvoidingView> */}
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
  },
  title: {
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.16,
    marginBottom: 32,
    textAlign: "center",
  },
  form: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    fontFamily: "Roboto-Regular",
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    color: "#212121",
    fontSize: 16,
    // borderColor: "#E8E8E8",
    // backgroundColor: "#F6F6F6",
    lineHeight: 19,
    marginBottom: 16,
    padding: 15,
    width: "100%",
  },
  registerBtn: {
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    marginTop: 33,
    paddingTop: 16,
    paddingBottom: 16,
  },
  registerBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
  },
  redirectBtn: {
    marginTop: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  redirectText: {
    color: "#1B4371",
    fontSize: 16,
    lineHeight: 18,
    textAlign: "center",
  },
});
