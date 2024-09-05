import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Dimensions,
} from "react-native";
import React, { useRef, useState } from "react";
import { COLORS } from "../constants/colors";
import { SelectList } from "react-native-dropdown-select-list";
import { Feather } from "@expo/vector-icons";
import SmallInputContainer from "../constants/smallInputContainer";
import SelectListCustom from "../constants/SelectList";
import AddStepBottomSheet from "../constants/AddStepBottomSheet";
import BottomSheet, { BottomSheetModal } from "@gorhom/bottom-sheet";
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const AddRecipe = () => {
    const [name, setName] = useState("");
    const [brewer, setBrewer] = useState("");
    const [grinder, setGrinder] = useState("");
    const [grinderSetrings, setGrinderSettings] = useState(0);
    const [temperature, setTemperature] = useState(0);
    const [waterAmount, setWaterAmount] = useState(0);
    const [coffeeAmount, setCoffeeAmount] = useState(0);
    const coffeeRatio = ~~(waterAmount / coffeeAmount);

    const isRatioReady =
        waterAmount !== 0 && coffeeAmount !== 0 && coffeeRatio !== 0;

    const brewers = [
        { key: "1", value: "V60", disabled: false },
        { key: "2", value: "Aeropress" },
        { key: "3", value: "Origami" },
        { key: "4", value: "French press", disabled: false },
        { key: "5", value: "Moka pot" },
        { key: "6", value: "Espresso" },
        { key: "7", value: "Drinks" },
    ];

    const grinders = [
        { key: "1", value: "Timemore c2", disabled: false },
        { key: "2", value: "Hario shit" },
        { key: "3", value: "Commandante" },
        { key: "4", value: "Zpresso", disabled: false },
    ];

    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const handlePresentModalPress = () => {
        console.log("bottom shit")
        bottomSheetRef.current?.present();
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView bounces={true}>
                <View style={{ paddingTop: 10, paddingHorizontal: 20 }}>
                    <View>
                        <Text style={styles.mediumText}>Name:</Text>
                        <View style={styles.textInputFrame}>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={setName}
                                value={name}
                                autoCapitalize="none"
                                autoComplete="off"
                                autoCorrect={false}
                                placeholder="Name"
                            />
                        </View>
                    </View>

                    <SelectListCustom
                        value={brewer}
                        onChange={setBrewer}
                        text="Brewer"
                        data={brewers}
                    />
                    <SelectListCustom
                        value={grinder}
                        onChange={setGrinder}
                        text="Grinder"
                        data={grinders}
                    />
                    <Text style={[styles.mediumText, { marginTop: 5 }]}>
                        Process:{" "}
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                        <SmallInputContainer
                            value={grinderSetrings}
                            onChange={setGrinderSettings}
                            isMargin={false}
                            placeholder="Clicks"
                        />
                        <SmallInputContainer
                            value={temperature}
                            onChange={setTemperature}
                            isMargin={true}
                            placeholder="Temperature"
                        />
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 5 }}>
                        <SmallInputContainer
                            value={waterAmount}
                            onChange={setWaterAmount}
                            isMargin={false}
                            placeholder="Water amount"
                        />
                        <SmallInputContainer
                            value={coffeeAmount}
                            onChange={setCoffeeAmount}
                            isMargin={true}
                            placeholder="Coffe amount"
                        />
                    </View>
                    <View
                        style={[styles.smallTextInputFrame, { marginTop: 10 }]}
                    >
                        {isRatioReady && (
                            <Text style={{ fontFamily: "light", fontSize: 10 }}>
                                Coffee / water ratio
                            </Text>
                        )}
                        <Text
                            style={
                                isRatioReady
                                    ? { fontSize: 19, color: COLORS.black }
                                    : {
                                          fontSize: 15,
                                          marginTop: -3,
                                          fontFamily: "regular",
                                          color: "#b3afac",
                                      }
                            }
                        >
                            {isRatioReady
                                ? `1:${coffeeRatio}`
                                : "Coffee / Water\nratio"}
                        </Text>
                    </View>
                    <View
                        style={{
                            marginTop: 10,
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text style={styles.mediumText}>Steps: </Text>
                        <TouchableOpacity onPress={handlePresentModalPress}>
                            <Feather
                                name="plus-circle"
                                size={24}
                                color={COLORS.espresso}
                                style={{ marginTop: 2 }}
                            />
                        </TouchableOpacity>
                    </View>
                    <AddStepBottomSheet ref={bottomSheetRef} title={"Title"} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default AddRecipe;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "flex-start",
        backgroundColor: COLORS.almond,
    },
    mediumText: {
        fontFamily: "medium",
        fontSize: 19,
    },
    textInputFrame: {
        borderWidth: 2,
        flex: 1,
        padding: 3,
        borderRadius: 10,
        borderColor: COLORS.espresso,
        width: width - 40,
        height: 40,
        paddingTop: 5,
    },
    textInput: {
        fontFamily: "regular",
        fontSize: 19,
    },
    smallTextInputFrame: {
        borderWidth: 2,
        flex: 1,
        padding: 3,
        borderRadius: 10,
        borderColor: COLORS.espresso,
        width: width * 0.4,
        height: height * 0.06,
        paddingTop: 5,
    },
});
