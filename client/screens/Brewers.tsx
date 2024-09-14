import React, { useRef, useCallback } from "react";
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Platform,
    TouchableOpacity,
    FlatList,
} from "react-native";
import { COLORS } from "../constants/colors";
import { height, width } from "../constants/screen";
import { Feather } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import AddBrewerBottomSheet from "../components/AddBrewerBottomSheet";
import { Brewer } from "../types/Brewer";
import { useBrewers } from "../context/BrewerContext"; // Import the custom hook

const Brewers = () => {
    const { brewers, addBrewer } = useBrewers(); // Use context hook

    const bottomSheetRef = useRef<BottomSheetModal>(null);

    // useCallback to ensure the function is not recreated unnecessarily
    const handlePresentModalPress = useCallback(() => {
        if (bottomSheetRef.current) {
            bottomSheetRef.current.present();
        }
    }, []);

    const handleCloseModal = useCallback(() => {
        bottomSheetRef.current?.dismiss();
    }, []);

    type ItemProps = { brewer: Brewer };

    const Item = ({ brewer }: ItemProps) => {
        return (
            <TouchableOpacity
                onPress={() => console.log("Going to recipe ", brewer.id)}
            >
                <View style={styles.item}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.title}>{brewer.name}</Text>
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
                <Text style={styles.mediumText}>Brewers:</Text>
                {brewers.length > 0 ? (
                    <View
                        style={[
                            styles.listBackground,
                            Platform.OS === "ios"
                                ? styles.shadow
                                : styles.elevation,
                        ]}
                    >
                        <FlatList
                            data={brewers}
                            renderItem={({ item }: { item: Brewer }) => (
                                <Item brewer={item} />
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
                    </View>
                ) : (
                    <Text style={styles.mediumText}>
                        Couldn't find any brewers
                    </Text>
                )}
            </View>
            <TouchableOpacity
                onPress={handlePresentModalPress}
                style={styles.addCircle}
            >
                <Feather name="plus-circle" size={50} color={COLORS.espresso} />
            </TouchableOpacity>
            <AddBrewerBottomSheet
                ref={bottomSheetRef}
                onAddBrewer={addBrewer} // Use context's addBrewer function
                close={handleCloseModal}
            />
        </SafeAreaView>
    );
};

export default Brewers;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.almond,
        paddingTop: 10,
    },
    mediumText: {
        fontFamily: "medium",
        fontSize: 19,
    },
    innerContainer: {
        paddingHorizontal: 20,
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
    infoText: {
        textAlign: "center",
        fontFamily: "semibold",
        fontSize: 19,
        marginTop: height * 0.35,
    },
    addCircle: {
        position: "absolute",
        top: height * 0.80,
        left: width * 0.8,
        backgroundColor: COLORS.pistache,
        borderRadius: 30,
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
