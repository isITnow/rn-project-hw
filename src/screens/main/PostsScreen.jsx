import { StyleSheet, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultScreenPosts from "../nestedScreens/DefaultScreenPosts";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";

const NestedScreen = createStackNavigator();

export default function PostsScreen() {
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <NestedScreen.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: "Roboto-Medium",
          fontSize: 17,
          lineHeight: 22,
          letterSpacing: 0.7,
          color: "#212121",
        },
        headerStyle: {
          borderBottomWidth: 1,
          borderColor: "rgba(0, 0, 0, 0.3)",
        },
      }}
      initialRouteName="DefaultScreen"
    >
      <NestedScreen.Screen
        options={{
          headerTitle: "Posts",
          headerLeft: () => "",
          headerRight: () => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={logOut}
              style={styles.redirectBtn}
            >
              <MaterialIcons name="logout" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
        name="DefaultScreen"
        component={DefaultScreenPosts}
      />
      <NestedScreen.Screen
        options={{
          headerTitle: "Comments",
          tabBarHideOnKeyboard: true,
        }}
        name="Comments"
        component={CommentsScreen}
      />
      <NestedScreen.Screen
        options={{
          headerTitle: "Map",
          tabBarHideOnKeyboard: true,
        }}
        name="Map"
        component={MapScreen}
      />
    </NestedScreen.Navigator>
  );
}

const styles = StyleSheet.create({
  redirectBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
});
