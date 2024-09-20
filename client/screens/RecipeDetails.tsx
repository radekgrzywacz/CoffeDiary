import {
    Image,
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../constants/colors";
import { RouteProp, useRoute } from "@react-navigation/native";
import { API_URL } from "../context/AuthContext";
import useAxios from "../utils/useAxios";
import { Recipe } from "../types/Recipe";
import { height, width } from "../constants/screen";
import { Step } from "../types/Step";
import Timeline from "react-native-timeline-flatlist";

type RecipeDetailsRouteProp = RouteProp<{ Recipe: { id: number } }, "Recipe">;
interface TimerValues {
    seconds: number;
    minutes: number;
}

const RecipeDetails = () => {
    const route = useRoute<RecipeDetailsRouteProp>();
    const { id } = route.params;
    const api = useAxios();
    const [recipe, setRecipe] = useState<Recipe>();
    const [time, setTime] = useState<TimerValues>();

    const getRecipeDetails = async () => {
        try {
            const result = await api.get(`${API_URL}/recipes/id/${id}`);
            const data = result.data;
            console.log(result.data);
            const fetchedRecipe: Recipe = {
                name: data.name,
                brewer: data.brewer,
                grinder: data.grinder,
                clicks: data.clicks,
                temperature: data.temperature,
                waterAmount: data.waterAmount,
                coffeeAmount: data.coffeeAmount,
                coffeeRatio: data.coffeeRatio,
                steps: data.steps.map((step: any) => ({
                    time: step.time,
                    title: `Step ${step.id}`,
                    description: step.description,
                })),
            };
            setRecipe(fetchedRecipe);
        } catch (e: any) {
            const errorMessage = e.response.data.error || "An error occurred";
            console.log(e);
            return { error: true, msg: errorMessage };
        }
    };

    useEffect(() => {
        getRecipeDetails();
    }, []);

    useEffect(() => {
        if (recipe) {
            let totalTime = 0;
            recipe.steps.forEach((step: Step) => {
                totalTime += step.time;
            });
            const minutes = Math.floor(totalTime / 60);
            const seconds = totalTime % 60;
            setTime({ minutes: minutes, seconds: seconds });
        }
    }, [recipe]);

    if (!recipe || time === null) {
        return (
            <View style={[styles.container]}>
                <ActivityIndicator size="large" />
                <Text>Loading...</Text>
            </View>
        );
    }

    const renderDetail = (step: Step) => {
        return (
            <View style={styles.detailContainer}>
                <View style={{ marginTop: -6 }}>
                    <Text style={styles.detailText}>{step.description}</Text>
                </View>
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

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.innerContainer}>
                <Text style={styles.boldText}>{recipe.name}</Text>
                <View
                    style={{
                        flexDirection: "row",
                    }}
                >
                    {recipe.coffeeRatio !== 0 && (
                        <View style={[styles.infoBox, { marginLeft: -0 }]}>
                            <Text>1:{recipe.coffeeRatio}</Text>
                        </View>
                    )}
                    {(time?.seconds > 0 || time?.minutes > 0) && (
                        <View style={[styles.infoBox, { marginLeft: 5 }]}>
                            <Text>
                                {time?.minutes > 0
                                    ? `${time.minutes} min `
                                    : ""}
                                {time?.seconds !== undefined
                                    ? `${time.seconds} s`
                                    : ""}
                            </Text>
                        </View>
                    )}
                </View>
                <View style={styles.iconRow}>
                    <View style={styles.iconBox}>
                        <Image
                            source={require("../assets/Coffee Machine Icon.png")}
                            style={{ width: "70%", height: "60%" }}
                        />
                        <Text style={{ fontFamily: "semibold", marginTop: 10 }}>
                            {recipe.brewer}
                        </Text>
                    </View>
                    <View style={styles.iconBox}>
                        <Image
                            source={require("../assets/Coffee Bean Icon.png")}
                            style={{ width: "70%", height: "60%" }}
                        />
                        <Text style={{ fontFamily: "semibold", marginTop: 10 }}>
                            {recipe.coffeeAmount}g
                        </Text>
                    </View>
                    <View style={styles.iconBox}>
                        <Image
                            source={require("../assets/Kettle Icon.png")}
                            style={{ width: "70%", height: "50%" }}
                        />
                        <Text
                            style={{
                                fontFamily: "semibold",
                                textAlign: "center",
                                marginTop: 5,
                            }}
                        >
                            {recipe.waterAmount}g{"\n"}
                            {recipe.temperature}°C
                        </Text>
                    </View>
                </View>
                <View style={styles.iconRow}>
                    <Text
                        style={{
                            alignSelf: "flex-start",
                            fontFamily: "semibold",
                            fontSize: 19,
                        }}
                    >
                        Grind:
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                        <View
                            style={[
                                styles.infoBox,
                                {
                                    flexDirection: "row",
                                    backgroundColor: COLORS.almondBright,
                                    borderTopLeftRadius: 10,
                                    borderBottomLeftRadius: 10,
                                    borderTopRightRadius: 0,
                                    borderBottomRightRadius: 0,
                                },
                            ]}
                        >
                            <Text>{recipe.grinder}</Text>
                        </View>
                        <View
                            style={[
                                styles.infoBox,
                                {
                                    flexDirection: "row",
                                    backgroundColor: COLORS.matcha,
                                    borderTopLeftRadius: 0,
                                    borderBottomLeftRadius: 0,
                                    borderTopRightRadius: 10,
                                    borderBottomRightRadius: 10,
                                },
                            ]}
                        >
                            <Text>{recipe.clicks}</Text>
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        backgroundColor: COLORS.espresso,
                        height: 2,
                        width: width * 0.9,
                        marginVertical: 10,
                        borderRadius: 10,
                    }}
                />
                <Text style={styles.boldText}>Steps:</Text>
                <Timeline
                    data={recipe.steps}
                    renderDetail={renderDetail}
                    lineColor={COLORS.pistache}
                    lineWidth={2}
                    dotColor={COLORS.pistache}
                    circleColor={COLORS.pistache}
                    timeContainerStyle={{ minWidth: 72 }}
                    style={{
                        paddingBottom: Platform.OS === "android" ? 100 : 65,
                        marginTop: 5,
                    }}
                    renderTime={renderTime}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default RecipeDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "flex-start",
        backgroundColor: COLORS.almond,
        paddingTop: 10,
    },
    boldText: {
        fontFamily: "bold",
        fontSize: 23,
    },
    innerContainer: {
        paddingHorizontal: 20,
    },
    iconBox: {
        backgroundColor: COLORS.almondBright,
        width: width * 0.25,
        height: width * 0.35,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    iconRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 20,
    },
    infoBox: {
        backgroundColor: COLORS.almondBright,
        borderRadius: 10,
        marginHorizontal: 0,
        padding: 8,
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
});
