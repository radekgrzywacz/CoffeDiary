import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { COLORS } from "../../constants/colors";

export default function _layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
      
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}

const styles = StyleSheet.create({});
