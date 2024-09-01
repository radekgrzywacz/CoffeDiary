import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootTabParamList } from "../types/navigationTypes";
import Test from "../screens/Test";
import Home from "../screens/Home";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "../constants/colors";

const Tab = createBottomTabNavigator<RootTabParamList>();

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const AppNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: COLORS.chai,
        tabBarInactiveTintColor: COLORS.espresso,
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle:{
          marginBottom: -height*0.02,
          fontFamily: "regular",
          fontSize: 12
        }
      }}
    >
      <Tab.Screen
        name="Test"
        component={Test}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="build"
              size={20}
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
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="home"
              size={20}
              color={color}
              style={styles.tabBarIcon}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.pistache,
    flex: 1,
    borderRadius: 30,
    marginBottom: 20,
    marginHorizontal: 20,
    position: "absolute",
    overflow: "hidden",
    height: height*0.08,
  },
  tabBarIcon: {
    marginTop: height*0.02
  },
});
