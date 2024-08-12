import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppStackNavigator from "./navigation/app-stack-navigator";
import { StatusBar } from "react-native";

const App = () => {
  return (
    <>
      <StatusBar backgroundColor={"black"} />
      <NavigationContainer>
        <AppStackNavigator />
      </NavigationContainer>
    </>
  );
};

export default App;
