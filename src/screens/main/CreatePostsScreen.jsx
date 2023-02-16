import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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

import { db } from "../../firebase/config";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

const initialState = {
  title: "",
  location: "",
};

export default function CreatePostsScreen({ navigation }) {
  const [isShownKeyboard, setIsShownKeyboard] = useState(false);

  const [photo, setPhoto] = useState("");
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photoInfo, setPhotoInfo] = useState(initialState);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const [coordinates, setCoordinates] = useState(null);

  const { userId, login, email } = useSelector((state) => state.auth);

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

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }
    const { coords } = await Location.getCurrentPositionAsync();
    const coordinates = {
      latitude: coords.latitude,
      longitude: coords.longitude,
    };
    setCoordinates(coordinates);
  };

  const camTypeChange = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const takePhoto = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      await MediaLibrary.createAssetAsync(uri);
      getLocation();
      setPhoto(uri);
    }
  };

  const retakePhoto = () => {
    setPhoto("");
  };

  const uploadPhotoToServer = async () => {
    try {
      const response = await fetch(photo);
      const file = await response.blob();

      const photoId = Date.now().toString();

      const storage = getStorage();
      const storageRef = ref(storage, `photos/${photoId}`);

      await uploadBytes(storageRef, file);

      const photoPath = ref(storage, `photos/${photoId}`);
      const photoUrl = await getDownloadURL(photoPath);

      return photoUrl;
    } catch (error) {
      console.error("Upload photo error: ", error.message);
    }
  };

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();

    try {
      const docRef = await addDoc(collection(db, "posts"), {
        photo,
        title: photoInfo.title,
        location: photoInfo.location,
        coordinates,
        userId,
        login,
        email,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const inputHandler = (value, name) => {
    setPhotoInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  // const photoData = {
  //   photo,
  //   photoInfo,
  //   coordinates,
  // };

  const isPhotoDataReady = !!photo && !!photoInfo.title && !!photoInfo.location;

  const postHandler = () => {
    navigation.navigate("DefaultScreen");
    uploadPostToServer();
    setPhoto("");
    setPhotoInfo(initialState);
    setCoordinates(null);
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
                onPress={retakePhoto}
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
                <TouchableOpacity
                  style={styles.flipCam}
                  onPress={camTypeChange}
                >
                  <Text style={styles.flipCamText}>flip cam</Text>
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
            style={styles.textInput}
            placeholderTextColor="#BDBDBD"
            placeholder="Title..."
          />
          <TextInput
            value={photoInfo.location}
            onChangeText={(value) => {
              inputHandler(value, "location");
            }}
            textAlign="left"
            style={{
              ...styles.textInput,
              marginTop: 16,
              paddingLeft: 30,
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
    height: 240,
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
  flipCam: {
    position: "absolute",
    right: 5,
    padding: 10,
    textAlign: "center",
  },
  flipCamText: {
    fontFamily: "Roboto-Medium",
    color: "#ffffff",
    letterSpacing: 0.7,
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
