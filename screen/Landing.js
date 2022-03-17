import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import Btn from "../components/Btn";

import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

import { AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Landing = ({ navigation }) => {
  const { user, isLoggedIn, userDispatch } = useContext(AuthContext);
  const [token, setToken] = useState("");
  const handleOpenWithBrower = async () => {
    return await Linking.openURL(`https://moonblogjs.netlify.app/#/${token}`);
  };

  useEffect(() => {
    const getToken = async () => {
      const getToken = await AsyncStorage.getItem("accToken");
      if (getToken) {
        setToken(getToken);
      }
    };
    getToken();
  }, [token]);
  return (
    <View style={styles.landing}>
      <Text>Welcome To Moon Blog!</Text>
      <Btn
        style={styles.btn}
        title="Go to Web WebBroswer"
        onPress={() => {
          WebBrowser.openBrowserAsync(
            `https://moonblogjs.netlify.app/?token=${token}`
          );
        }}
      />
      <Btn
        style={styles.btn}
        title="Go to Web Linking"
        onPress={() => {
          handleOpenWithBrower();
        }}
      />
      {isLoggedIn && (
        <>
          <Text>{user.name}</Text>
          <Text>{user.email}</Text>
        </>
      )}
      <View style={styles.btn__container}>
        {!isLoggedIn ? (
          <>
            <Btn
              style={styles.btn}
              title="Register"
              onPress={() => {
                navigation.navigate("Register");
              }}
            />
            <Btn
              title="Login"
              onPress={() => {
                navigation.navigate("Login");
              }}
            />
          </>
        ) : (
          <>
            <Btn
              title="Log Out"
              onPress={() => {
                userDispatch({ type: "LOGGED_OUT_USER" });
              }}
            />
          </>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  landing: {
    flex: 1,
    justifyContent: "space-evenly",
    alignContent: "center",
  },
  btn__container: {
    justifyContent: "center",
    alignContent: "center",
  },
});

export default Landing;
