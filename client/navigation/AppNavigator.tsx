import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootTabParamList } from "../types/navigationTypes";
import Profile from "../screens/Profile";
import Home from "../screens/Home";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "../constants/colors";
import Diary from "../screens/Diary";
import { TabBar } from "../components/TabBar";
import Recipes from "../screens/Recipes";
import New from "../screens/New";

const Tab = createBottomTabNavigator<RootTabParamList>();

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const AppNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      initialRouteName="Home"
      screenOptions={{
        //tabBarShowLabel: false,
        headerShown: false,
        //   tabBarStyle: styles.tabBar,
        //   tabBarActiveTintColor: COLORS.espresso,
        //   tabBarInactiveTintColor: COLORS.espresso,
      }}
    >
      <Tab.Screen name="Diary" component={Diary} />
      <Tab.Screen name="Recipes" component={Recipes} />
      <Tab.Screen name="New" component={New} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
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
