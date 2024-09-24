import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigationTypes";
import Brews from "../screens/Brews";
import Coffees from "../screens/Coffees";

const Stack = createStackNavigator<RootStackParamList>();

const DiaryNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Coffees" component={Coffees} />
            <Stack.Screen name="Brews" component={Brews} />
        </Stack.Navigator>
    );
};

export default DiaryNavigator;
