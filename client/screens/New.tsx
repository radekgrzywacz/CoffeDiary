import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { COLORS } from "../constants/colors";
import AddNewNavigator from "../navigation/AddNewNavigator";

const New = () => {
    return (
        <SafeAreaView style={styles.container}>
            <AddNewNavigator />
        </SafeAreaView>
    );
};

export default New;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: "center",
        backgroundColor: COLORS.almond,
    },
    selection: {
        padding: 3,
        borderWidth: 2,
        borderRadius: 14,
        borderColor: COLORS.espresso,
        marginHorizontal: -20,
    },
});
