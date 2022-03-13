import React, { useContext } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import Btn from "../components/Btn";

import { AuthContext } from "../context/AuthContext";
const Landing = ({ navigation }) => {
  const { user, isLoggedIn, userDispatch } = useContext(AuthContext);

  return (
    <View style={styles.landing}>
      <Text>Welcome To Moon Blog!</Text>
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
