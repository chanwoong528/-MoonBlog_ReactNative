import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Login from "../screen/Auth/Login";
import Landing from "../screen/Landing";
import Register from "../screen/Auth/Register";
const LandStack = createStackNavigator();
export default function LandingStack() {
  return (
    <LandStack.Navigator initialRouteName="Landing">
      <LandStack.Screen name="Landing" component={Landing} />
      <LandStack.Screen name="Login" component={Login} />
      <LandStack.Screen name="Register" component={Register} />
    </LandStack.Navigator>
  );
}
