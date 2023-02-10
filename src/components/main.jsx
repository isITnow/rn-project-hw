// import { useEffect } from "react";
import useRoute from "../router";

import { NavigationContainer } from "@react-navigation/native";

export default function Main() {
  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  const routing = useRoute(stateChange);

  return (
    <NavigationContainer onLayout={onLayout}>{routing}</NavigationContainer>
  );
}
