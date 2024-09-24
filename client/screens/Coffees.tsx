import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { COLORS } from "../constants/colors";
import { CoffeesScreenNavigationProp } from "../types/navigationTypes";
import { Coffee } from "../types/Coffee";
import { Feather } from "@expo/vector-icons";
import { height, width } from "../constants/screen";

interface CoffeesProps {
    navigation: CoffeesScreenNavigationProp;
}

interface CoffeeName {
    name: string;
    id: number;
}

const Coffees = ({ navigation }: CoffeesProps) => {
    const [coffeeNames, setCoffeeNames] = useState<CoffeeName[]>([]);

    type ItemProps = { name: string; id: number };

    const Item = ({ name, id }: ItemProps) => {
        return (
            <TouchableOpacity onPress={() => console.log("Going to brews")}>
                <View style={styles.item}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.title}>{name}</Text>
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
                {coffeeNames.length > 0 ? (
                    <FlatList
                        data={coffeeNames}
                        renderItem={({ item }) => (
                            <Item name={item.name} id={item.id} />
                        )}
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
});
