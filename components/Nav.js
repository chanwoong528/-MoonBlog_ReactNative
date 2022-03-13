import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Btn from "./Btn";
import Landing from "../screen/Landing";
import About from "../screen/About";
import Post from "../screen/Post";
import LandingStack from "./LandingStack";
import Poststack from "./PostStack";

const Tab = createBottomTabNavigator();
const Nav = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Main" component={LandingStack} />
        <Tab.Screen name="About" component={About} />
        <Tab.Screen name="Post" component={Poststack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Nav;
