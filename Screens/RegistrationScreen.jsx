import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";

export default function RegistrationScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/background_2x.jpg")}
        style={styles.image}
      >
        <View style={styles.form}>
          <Text style={styles.title}>Registration</Text>
          <TextInput
            placeholder="Login"
            placeholderTextColor="#BDBDBD"
            textAlign="left"
            style={styles.textInput}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#BDBDBD"
            textAlign="left"
            style={styles.textInput}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#BDBDBD"
            textAlign="left"
            secureTextEntry={true}
            style={styles.textInput}
          />
          <TouchableOpacity activeOpacity={0.8} style={styles.registerBtn}>
            <Text style={styles.registerBtnText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  title: {
    // fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.16,
    marginBottom: 32,
    marginTop: 60,
    textAlign: "center",
    color: "#212121",
  },
  form: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    width: "100%",
    padding: 15,
    marginBottom: 16,

    // font-family: 'Roboto';
    // fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  registerBtn: {
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  registerBtnText: {
    color: "#FFFFFF",
    // font-family: 'Roboto';
    // fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
  },
});
