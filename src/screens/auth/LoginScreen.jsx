import { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";

import Input from "../../components/Input";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ navigation }) {
  const [credentials, setCredentials] = useState(initialState);
  const [isShownKeyboard, setIsShownKeyboard] = useState(false);

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
    navigation.navigate("Home");
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../../assets/images/background_2x.jpg")}
          style={styles.image}
        >
          <View
            style={{
              ...styles.form,
              paddingBottom: isShownKeyboard ? 20 : 110,
            }}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "hight"}
            >
              <Text style={styles.title}>Log in</Text>
              <Input
                placeholder="Enter your email"
                value={credentials.email}
                onChangeText={(value) => {
                  inputHandler(value, "email");
                }}
                onFocus={() => {
                  onFocusHandler();
                }}
              />

              <Input
                placeholder="Enter password"
                value={credentials.password}
                onChangeText={(value) => {
                  inputHandler(value, "password");
                }}
                onFocus={() => {
                  onFocusHandler();
                }}
                password
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
                    onPress={() => navigation.navigate("Registration")}
                    style={styles.redirectBtn}
                  >
                    <Text style={styles.redirectText}>
                      Have no account? Register
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </KeyboardAvoidingView>
          </View>
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
    letterSpacing: 0.8,
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
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18,
    letterSpacing: 0.7,
    textAlign: "center",
  },
});
