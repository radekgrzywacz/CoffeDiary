import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Button,
    Platform,
} from "react-native";
import React, { useRef, useState } from "react";
import { COLORS } from "../constants/colors";
import SmallInputContainer from "../components/smallInputContainer";
import SelectListCustom from "../components/SelectList";
import AddStepBottomSheet from "../components/AddStepBottomSheet";
import { Feather } from "@expo/vector-icons";
import Timeline from "react-native-timeline-flatlist";
import { Recipe } from "../types/Recipe";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export interface Step {
    time: number;
    title: string;
    description: string;
}

const AddRecipe = () => {
    const [name, setName] = useState<string>("");
    const [brewer, setBrewer] = useState<string>("");
    const [grinder, setGrinder] = useState<string>("");
    const [grinderSettings, setGrinderSettings] = useState<number>(0);
    const [temperature, setTemperature] = useState<number>(0);
    const [waterAmount, setWaterAmount] = useState<number>(0);
    const [coffeeAmount, setCoffeeAmount] = useState<number>(0);
    const coffeeRatio = ~~(waterAmount / coffeeAmount);
    const [steps, setSteps] = useState<Step[]>([
        {
            description: "Grind 20g of coffee",
            time: 123,
            title: "Grind coffee",
        },
        {
            description: "Heat 300ml of water to 90°C",
            time: 30,
            title: "Heat water",
        },
        {
            description: "Grind 20g of coffee",
            time: 123,
            title: "Grind coffee",
        },
        {
            description: "Heat 300ml of water to 90°C",
            time: 30,
            title: "Heat water",
        },
        {
            description: "Grind 20g of coffee",
            time: 123,
            title: "Grind coffee",
        },
        {
            description: "Heat 300ml of water to 90°C",
            time: 30,
            title: "Heat water",
        },
        {
            description: "Grind 20g of coffee",
            time: 123,
            title: "Grind coffee",
        },
        {
            description: "Heat 300ml of water to 90°C",
            time: 30,
            title: "Heat water",
        },
    ]);

    const deleteStep = (stepToDelete: Step) => {
        setSteps((prevSteps) =>
            prevSteps.filter((step) => step !== stepToDelete)
        );
    };

    const handleAddStep = (newStep: Step) => {
        setSteps((prevSteps) => [...prevSteps, newStep]);
    };

    const renderDetail = (step: Step) => {
        return (
            <View style={styles.detailContainer}>
                <View style={{ marginTop: -6 }}>
                    <Text style={styles.detailText}>{step.description}</Text>
                </View>
                <TouchableOpacity onPress={() => deleteStep(step)}>
                    <Feather
                        name="trash"
                        size={15}
                        color={COLORS.espresso}
                        style={{ marginTop: -12, alignSelf: "flex-end" }}
                    />
                </TouchableOpacity>
            </View>
        );
    };

    const renderTime = (step: Step) => {
        const minutes = Math.floor(step.time / 60);
        const seconds = step.time % 60;

        // Conditional rendering based on minutes and seconds
        return (
            <View style={{ minWidth: 65 }}>
                {step.time > 0 && (
                    <Text>
                        {minutes > 0 ? `${minutes} min ` : ""}
                        {seconds > 0 || minutes > 0 ? `${seconds} s` : ""}
                    </Text>
                )}
            </View>
        );
    };

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
        bottomSheetRef.current?.present();
    };
    const handleCloseModal = () => {
        bottomSheetRef.current?.dismiss();
    };

    const onSave = () => {
        const newRecipe: Recipe = {
            name: name,
            brewer: brewer,
            grinder: grinder,
            clicks: grinderSettings,
            temperature: temperature,
            waterAmount: waterAmount,
            coffeeAmount: coffeeAmount,
            coffeeRatio: coffeeRatio,
            steps: steps,
        };

        console.log(newRecipe);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <TouchableOpacity
                    style={{ alignSelf: "flex-end", flexDirection: "row" }}
                    onPress={() => onSave()}
                >
                    <Text style={{ fontFamily: "light", fontSize: 15, color: COLORS.espresso }}>
                        Save{" "}
                    </Text>
                    <Feather name="save" size={20} color={COLORS.espresso} />
                </TouchableOpacity>
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
                <Text
                    style={[
                        styles.mediumText,
                        { marginTop: 5, marginBottom: -10 },
                    ]}
                >
                    Process:{" "}
                </Text>
                <View style={styles.processContainer}>
                    <SmallInputContainer
                        value={grinderSettings}
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
                <View style={styles.processContainer}>
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
                <View style={styles.ratioContainer}>
                    {isRatioReady && (
                        <Text style={styles.ratioText}>
                            Coffee / water ratio
                        </Text>
                    )}
                    <Text
                        style={
                            isRatioReady
                                ? styles.ratioValue
                                : styles.ratioPlaceholder
                        }
                    >
                        {isRatioReady
                            ? `1:${coffeeRatio}`
                            : "Coffee / Water\nratio"}
                    </Text>
                </View>
                <View style={styles.stepsHeader}>
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
                <AddStepBottomSheet
                    ref={bottomSheetRef}
                    onAddStep={handleAddStep}
                    close={handleCloseModal}
                />
                {/* <Button onPress={() => console.log(steps)} title="Steps" /> */}

                <Timeline
                    data={steps}
                    renderDetail={renderDetail}
                    lineColor={COLORS.pistache}
                    lineWidth={2}
                    dotColor={COLORS.pistache}
                    circleColor={COLORS.pistache}
                    timeContainerStyle={{ minWidth: 72 }}
                    style={{
                        height: height * 0.2,
                        paddingBottom: Platform.OS === "android" ? 100 : 65,
                        marginTop: 5,
                    }}
                    renderTime={renderTime}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "flex-start",
        backgroundColor: COLORS.almond,
    },
    innerContainer: {
        paddingTop: 10,
        paddingHorizontal: 20,
    },
    mediumText: {
        fontFamily: "medium",
        fontSize: 19,
    },
    textInputFrame: {
        borderWidth: 2,
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
    processContainer: {
        flexDirection: "row",
        marginTop: 5,
    },
    ratioContainer: {
        borderWidth: 2,
        padding: 3,
        borderRadius: 10,
        borderColor: COLORS.espresso,
        width: width * 0.4,
        height: height * 0.06,
        paddingTop: 5,
        marginTop: 10,
    },
    ratioText: {
        fontFamily: "light",
        fontSize: 10,
    },
    ratioValue: {
        fontSize: 19,
        color: COLORS.black,
    },
    ratioPlaceholder: {
        fontSize: 15,
        marginTop: -3,
        fontFamily: "regular",
        color: "#b3afac",
    },
    stepsHeader: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    detailContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        paddingHorizontal: 5,
        //marginTop: -15,
    },
    detailText: {
        fontFamily: "regular",
        fontSize: 15,
        //flex: 1,
        marginTop: -10,
        maxWidth: width * 0.5,
    },
    timeline: {
        // marginTop: 10,
        //  marginStart: -5,
    },
    timeContainer: {
        minWidth: width,
    },
});

export default AddRecipe;
