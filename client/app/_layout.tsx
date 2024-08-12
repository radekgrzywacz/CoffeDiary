import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { COLORS } from "../constants/colors";
import { useFonts } from "expo-font";


export default function _layout() {

  const [fontsLoaded] = useFonts({
    regular: require("../assets/fonts/Poppins-Regular.ttf"),
    bold: require("../assets/fonts/Poppins-Bold.ttf"),
    extrabold: require("../assets/fonts/Poppins-ExtraBold.ttf"),
    light: require("../assets/fonts/Poppins-Light.ttf"),
    medium: require("../assets/fonts/Poppins-Medium.ttf"),
    semibold: require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={{flex: 1}}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
      </Stack>
  );
}

const styles = StyleSheet.create({});
