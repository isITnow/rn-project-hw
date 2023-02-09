import React, { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import RegistrationScreen from "./src/screens/auth/RegistrationScreen";
import LoginScreen from "./src/screens/auth/LoginScreen";

const AuthStack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (error) {
        console.log(error.message);
      }
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen name="Registration" component={RegistrationScreen} />
        <AuthStack.Screen name="Login" component={LoginScreen} />
      </AuthStack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
