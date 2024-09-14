import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";
import { width } from "../screens/Recipes";
import { CoffeeIcon } from "../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigationTypes";

type ProfileSectionProps = {
    feather: boolean;
    text: string;
    iconName: string;
    route: keyof RootStackParamList; // Ensure the route name matches the keys of the navigation stack
    navigation: NativeStackNavigationProp<RootStackParamList>;
};

const ProfileSection = ({
    feather,
    text,
    iconName,
    route,
    navigation,
}: ProfileSectionProps) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate(route)}>
            <View style={styles.section}>
                {feather ? (
                    <Feather
                        name={iconName}
                        size={25}
                        color={COLORS.espresso}
                        style={{ marginTop: 2 }}
                    />
                ) : (
                    <CoffeeIcon
                        name={iconName}
                        size={25}
                        color={COLORS.espresso}
                        style={{ marginTop: 2 }}
                    />
                )}
                <Text style={styles.sectionText}>{text}</Text>
                <Feather
                    name="arrow-right"
                    size={25}
                    color={COLORS.espresso}
                    style={{ marginTop: 2, marginLeft: "auto" }}
                />
            </View>
        </TouchableOpacity>
    );
};

export default ProfileSection;

const styles = StyleSheet.create({
    sectionText: {
        fontFamily: "regular",
        fontSize: 19,
        marginTop: 1,
        color: COLORS.espresso,
        textAlign: "left",
        marginLeft: 10,
        flex: 1
    },
    section: {
        flexDirection: "row",
        alignItems: "flex-start",
        padding: 10,
    },
});
