import { useState } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

export default function CommentsScreen({ route }) {
  const [isShownKeyboard, setIsShownKeyboard] = useState(false);
  const [comment, setComment] = useState("");
  const { postId } = route.params;
  const { login } = useSelector((state) => state.auth);

  const keyboardHide = () => {
    setIsShownKeyboard(false);
    Keyboard.dismiss();
  };

  const createComment = async () => {
    try {
      const uniqName = Date.now().toString();
      await setDoc(doc(db, "posts", postId, "comments", uniqName), {
        login,
        comment,
      });
      keyboardHide();
      setComment("");
    } catch (error) {
      console.error("Create comment error: ", error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <TextInput
          value={comment}
          onChangeText={(value) => {
            setComment(value);
          }}
          textAlign="left"
          style={{
            ...styles.textInput,
            // marginTop: 16,
            // paddingLeft: 30,
          }}
          placeholderTextColor="#BDBDBD"
          placeholder="Comment..."
        />
        <TouchableOpacity
          disabled={!comment}
          activeOpacity={0.8}
          onPress={createComment}
          style={{
            ...styles.postBtn,
            backgroundColor: comment ? "#FF6C00" : "#F6F6F6",
            borderWidth: comment ? null : 1,
            borderColor: comment ? null : "#BDBDBD",
          }}
        >
          <AntDesign
            name="arrowup"
            size={20}
            color={comment ? "#FFFFFF" : "#BDBDBD"}
          />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 16,
  },
  textInput: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: 0.7,
    marginBottom: 16,
    paddingVertical: 13,
    paddingLeft: 16,
    paddingRight: 48,
  },
  postBtn: {
    alignItems: "center",
    bottom: 28,
    borderRadius: 100,
    height: 34,
    justifyContent: "center",
    position: "absolute",
    right: 25,
    width: 34,
  },
});
