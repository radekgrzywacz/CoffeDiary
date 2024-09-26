import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    Platform,
    TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../constants/colors";
import { CoffeesScreenNavigationProp } from "../types/navigationTypes";
import { Coffee } from "../types/Coffee";
import { Feather } from "@expo/vector-icons";
import { height, width } from "../constants/screen";
import useAxios from "../utils/useAxios";
import { API_URL } from "../context/AuthContext";
import { useCoffees } from "../context/CoffeeContext";

interface CoffeesProps {
    navigation: CoffeesScreenNavigationProp;
}

const Coffees = ({ navigation }: CoffeesProps) => {
    const api = useAxios();
    const { coffees, refreshCoffees } = useCoffees();

    type ItemProps = { coffee: Coffee };

    const Item = ({ coffee }: ItemProps) => {
        return (
            <TouchableOpacity
                onPress={() => console.log("Going to brew: ", coffee.id)}
            >
                <View style={styles.item}>
                    <View style={{ flex: 1 }}>
                        <View>
                            <Text style={styles.title}>{coffee.name}</Text>
                            <Text style={styles.smallText}>
                                {coffee.country} | {coffee.roastery}
                            </Text>
                        </View>
                    </View>
                    <Feather
                        name="arrow-right"
                        size={19}
                        color={COLORS.black}
                        style={{ alignSelf: "flex-end" }}
                    />
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={styles.mediumText}>Choose coffee:</Text>
                {coffees.length > 0 ? (
                    <View
                        style={[
                            styles.listBackground,
                            Platform.OS === "ios"
                                ? styles.shadow
                                : styles.elevation,
                        ]}
                    >
                        <FlatList
                            data={coffees}
                            renderItem={({ item }) => <Item coffee={item} />}
                            keyExtractor={(item) => item.id.toString()}
                            ItemSeparatorComponent={() => (
                                <View
                                    style={{
                                        borderBottomWidth: 2,
                                        borderBottomColor: COLORS.espresso,
                                        width: width * 0.85,
                                        alignSelf: "center",
                                    }}
                                ></View>
                            )}
                        />
                    </View>
                ) : (
                    <Text style={styles.infoText}>
                        You don't have any coffees added
                    </Text>
                )}
            </View>
        </SafeAreaView>
    );
};

export default Coffees;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "flex-start",
        padding: 24,
        backgroundColor: COLORS.almond,
    },
    mediumText: {
        fontFamily: "medium",
        fontSize: 19,
    },
    smallText: {
        fontFamily: "regular",
        fontSize: 15,
        color: COLORS.almond,
    },
    innerContainer: {
        paddingHorizontal: 20,
    },
    infoText: {
        textAlign: "center",
        fontFamily: "semibold",
        fontSize: 19,
        marginTop: height * 0.35,
    },
    item: {
        borderWidth: 0,
        borderColor: COLORS.espresso,
        borderRadius: 10,
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        fontSize: 19,
        alignSelf: "flex-start",
    },
    listBackground: {
        backgroundColor: COLORS.pistache,
        borderRadius: 10,
        marginTop: 10,
        width: width * 0.9,
    },
    shadow: {
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    elevation: {
        elevation: 5,
    },
});
