import { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { FontAwesome, SimpleLineIcons } from "@expo/vector-icons";

const initialState = {
  title: "",
  location: "",
};

export default function CreatePostsScreen({ navigation }) {
  const [photo, setPhoto] = useState("");
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photoInfo, setPhotoInfo] = useState(initialState);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isShownKeyboard, setIsShownKeyboard] = useState(false);

  const keyboardHide = () => {
    setIsShownKeyboard(false);
    Keyboard.dismiss();
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  const takePhoto = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      await MediaLibrary.createAssetAsync(uri);
      // getlocation();
      setPhoto(uri);
    }
  };

  const refreshPhoto = () => {
    setPhoto("");
  };

  const inputHandler = (value, name) => {
    setPhotoInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const photoData = {
    photo,
    photoInfo,
  };

  const isPhotoDataReady = !!photo && !!photoInfo.title && !!photoInfo.location;

  const postHandler = () => {
    navigation.navigate("Posts", { photoData });
    setPhoto("");
    setPhotoInfo(initialState);
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <View style={styles.photoContainer}>
          {photo ? (
            <>
              <View style={styles.imageWrapper}>
                <Image style={styles.image} source={{ uri: photo }} />
              </View>
              <TouchableOpacity
                style={styles.refreshButton}
                onPress={refreshPhoto}
              >
                <FontAwesome name="refresh" size={20} color="white" />
              </TouchableOpacity>
            </>
          ) : (
            <Camera
              style={styles.camera}
              type={type}
              ref={(ref) => {
                setCameraRef(ref);
              }}
            >
              <View style={styles.photoView}>
                <TouchableOpacity style={styles.button} onPress={takePhoto}>
                  <FontAwesome name="camera" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </Camera>
          )}
        </View>
        <Text style={styles.cameraTag}>
          {photo ? "Add photo description" : "Take a photo"}
        </Text>
        <View style={styles.inputWrapper}>
          <TextInput
            value={photoInfo.title}
            onChangeText={(value) => {
              inputHandler(value, "title");
            }}
            textAlign="left"
            // onFocus={}
            // onBlur={}
            style={{
              ...styles.textInput,
              // borderColor: isInFocus ? "#FF6C00" : "#E8E8E8",
              // backgroundColor: isInFocus ? "#FFFFFF" : "#F6F6F6",
            }}
            placeholderTextColor="#BDBDBD"
            placeholder="Title..."
          />
          <TextInput
            value={photoInfo.location}
            onChangeText={(value) => {
              inputHandler(value, "location");
            }}
            textAlign="left"
            // onFocus={}
            // onBlur={}
            style={{
              ...styles.textInput,
              marginTop: 16,
              paddingLeft: 30,
              // borderColor: isInFocus ? "#FF6C00" : "#E8E8E8",
              // backgroundColor: isInFocus ? "#FFFFFF" : "#F6F6F6",
            }}
            placeholderTextColor="#BDBDBD"
            placeholder="Location..."
          />
          <SimpleLineIcons
            style={styles.locationIcon}
            name="location-pin"
            size={24}
            color="#BDBDBD"
          />
        </View>
        <TouchableOpacity
          disabled={!isPhotoDataReady}
          activeOpacity={0.8}
          onPress={postHandler}
          style={{
            ...styles.postBtn,
            backgroundColor: isPhotoDataReady ? "#FF6C00" : "#F6F6F6",
          }}
        >
          <Text
            style={{
              ...styles.postBtnText,
              color: isPhotoDataReady ? "#FFFFFF" : "#BDBDBD",
            }}
          >
            Publish
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    paddingHorizontal: 16,
  },
  photoContainer: {
    backgroundColor: "#F6F6F6",
    overflow: "hidden",
    marginTop: 32,
    height: "35%",
    borderRadius: 8,
  },
  camera: {
    height: "100%",
    width: "100%",
  },
  imageWrapper: {
    // borderRadius: 8,
    // borderWidth: 2,
    // borderColor: "white",
    // // height: "100%",
    // overflow: "hidden",
    // // width: "100%",
  },
  image: { width: "100%", height: "100%" },
  photoView: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
  },
  button: {
    alignSelf: "center",
    marginBottom: 90,
    width: 60,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  refreshButton: {
    position: "absolute",
    top: 10,
    right: 10,
    alignSelf: "center",
    width: 40,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraTag: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#BDBDBD",
    lineHeight: 19,
    marginTop: 8,
    letterSpacing: 0.7,
  },
  inputWrapper: {
    marginTop: 32,
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    paddingVertical: 16,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    letterSpacing: 0.7,
  },
  locationIcon: {
    position: "absolute",
    bottom: 17,
  },
  postBtn: {
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    marginTop: 33,
    paddingTop: 16,
    paddingBottom: 16,
  },
  postBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: 0.7,
    textAlign: "center",
  },
});
