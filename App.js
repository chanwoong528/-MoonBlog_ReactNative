import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { AuthProvider } from "./context/AuthContext";
import { PostProvider } from "./context/PostContext";

import Routes from "./screen/Routes";
import Nav from "./components/Nav";
export default function App() {
  return (
    <>
      <AuthProvider>
        <PostProvider>
          <Routes />
        </PostProvider>
      </AuthProvider>
    </>
  );
}
