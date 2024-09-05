import { StyleSheet, Text, View, Dimensions } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AddCoffee from "../screens/AddCoffee";
import AddRecipe from "../screens/AddRecipe";
import { COLORS } from "../constants/colors";

const Tab = createMaterialTopTabNavigator();

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

function AddNewNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarStyle: {
                    backgroundColor: COLORS.almond,
                },
                tabBarActiveTintColor: COLORS.espresso,
                tabBarLabel: ({ focused }) => {
                    return (
                        <View
                            style={{
                                width: width / 2,
                                alignItems: "center",
                                flex: 1,
                            }}
                        >
                            <View
                                style={
                                    focused
                                        ? styles.selectedTab
                                        : styles.notSelectedTab
                                }
                            >
                                <Text style={focused ? styles.focusedText : styles.notFocusedText}>{route.name}</Text>
                            </View>
                        </View>
                    );
                },
                tabBarIndicatorStyle: {
                    height: 0, // Hides the indicator line
                },
            })}
        >
            <Tab.Screen name="Coffee" component={AddCoffee} />
            <Tab.Screen name="Recipe" component={AddRecipe} />
        </Tab.Navigator>
    );
}

export default AddNewNavigator;

const styles = StyleSheet.create({
    selectedTab: {
        borderWidth: 0,
        paddingHorizontal: 5,
        borderRadius: 15,
        borderColor: COLORS.espresso,
        backgroundColor: COLORS.pistache
    },
    notSelectedTab: {
        padding: 3,
        alignItems: "center",
    },
    focusedText: { fontFamily: "semibold", fontSize: 17, color: COLORS.espresso },
    notFocusedText: {fontFamily: "regular", fontSize: 15}
});
