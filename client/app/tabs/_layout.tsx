import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, Tabs } from "expo-router";
import { COLORS } from "../../constants/colors";

export default function _layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      
    >
      <Tabs.Screen name="home" />
    </Tabs>
  );
}

const styles = StyleSheet.create({});
