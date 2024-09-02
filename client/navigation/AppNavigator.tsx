import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootTabParamList } from "../types/navigationTypes";
import Test from "../screens/Test";
import Home from "../screens/Home";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "../constants/colors";
import Diary from "../screens/Diary";

// Preload both images
const bookIcon = require("../assets/book.png");
const bookOutlineIcon = require("../assets/book-outline.png");
const homeIcon = require("../assets/home.png")
const homeOutlineIcon = require("../assets/home-outline.png")

const Tab = createBottomTabNavigator<RootTabParamList>();

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const AppNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: COLORS.espresso,
        tabBarInactiveTintColor: COLORS.espresso,
      }}
    >
      <Tab.Screen
        name="Test"
        component={Test}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "build" : "build-outline"}
              size={30}
              color={color}
              style={styles.tabBarIcon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              <Image
                source={focused ? homeIcon : homeOutlineIcon}
                resizeMode="contain"
                style={[styles.iconImage, { tintColor: color }]}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Diary"
        component={Diary}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              <Image
                source={focused ? bookIcon : bookOutlineIcon}
                resizeMode="contain"
                style={[styles.iconImage, { tintColor: color }]}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 25,
    left: 20,
    right: 20,
    backgroundColor: COLORS.matcha,
    borderRadius: 15,
    height: 90,
    shadowColor: COLORS.espresso,
    shadowOffset: {
      width: 4,
      height: 7,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  tabBarIcon: {
    marginTop: 0,
    paddingTop: height * 0.02,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    top: 10,
    
  },
  iconImage: {
    width: 30,
    height: 30,
  },
});
