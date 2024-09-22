import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RecipeInstructionScreenNavigationProp } from "../types/navigationTypes";
import { Recipe } from "../types/Recipe";
import { COLORS } from "../constants/colors";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { height, width } from "../constants/screen";
import { Step } from "../types/Step";

interface RecipeInstructionProps {
    navigation: RecipeInstructionScreenNavigationProp;
}
type RecipeInstructionRouteProp = RouteProp<
    { Recipe: { recipe: Recipe } },
    "Recipe"
>;

const RecipeInstruction = ({ navigation }: RecipeInstructionProps) => {
    const route = useRoute<RecipeInstructionRouteProp>();
    const { recipe } = route.params;
    const [key, setKey] = useState<number>(0);
    const [stepsCounter, setStepsCounter] = useState<number>(0);
    const [step, setStep] = useState<Step>(recipe.steps[stepsCounter]);
    const [time, setTime] = useState<number>(step.time);
    const [desc, setDesc] = useState<string>(step.description);
    const timerSize = width * 0.8;
    const [finish, setFinish] = useState<boolean>(false);

    const changeStep = () => {
        setStepsCounter((prevCounter) => {
            if (prevCounter < recipe.steps.length - 1) {
                setFinish(false);
                const newStepIndex = prevCounter + 1;
                const newStep: Step = recipe.steps[newStepIndex];

                console.log(`Changing to Step ${newStep.title}`);

                setStep(newStep);
                setTime(newStep.time);
                setDesc(newStep.description);

                setKey((prevKey) => prevKey + 1);

                return newStepIndex; // Return the updated counter value
            }
            setFinish(true);
            return prevCounter; // If no change, return the current counter
        });
    };

    useEffect(() => {
        console.log(`Current Step Counter: ${stepsCounter}`);
        console.log(`Current Step: ${step.description}, Time: ${time}`);
    }, [stepsCounter, step, time]); // This will log when any of these values change

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={{ fontFamily: "semibold", fontSize: 25 }}>
                    {recipe.name}
                </Text>
                <View style={styles.timer}>
                    <View>
                        <CountdownCircleTimer
                            key={key}
                            isPlaying={time === 0 ? false : true}
                            duration={time}
                            colors={["#809671", "#B3B792", "#E5D2B8"]}
                            colorsTime={[time, time / 2, 0]}
                            size={timerSize}
                            strokeWidth={20}
                            onComplete={() => {
                                changeStep();
                            }}
                        >
                            {({ remainingTime }) => (
                                <View
                                    style={{
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: timerSize * 0.9,
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily: "bold",
                                            fontSize: 80,
                                            color: COLORS.matcha,
                                        }}
                                    >
                                        {remainingTime}
                                    </Text>
                                    <Text
                                        style={{
                                            fontFamily: "medium",
                                            fontSize: 20,
                                            textAlign: "center",
                                        }}
                                    >
                                        {desc}
                                    </Text>
                                </View>
                            )}
                        </CountdownCircleTimer>
                        {time === 0 && (
                            <TouchableOpacity onPress={changeStep}>
                                <Text>Next step</Text>
                            </TouchableOpacity>
                        )}
                        {stepsCounter === recipe.steps.length - 1 && finish && (
                            <View style={{marginTop: height*0.1}}>
                            <TouchableOpacity
                                style={styles.finishButton}
                                onPress={() => navigation.navigate("Recipes")}
                            >
                                <Text>Finish</Text>
                            </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default RecipeInstruction;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: COLORS.almond,
        paddingTop: 10,
    },
    innerContainer: {
        flex: 1,
        width: "100%",
        paddingHorizontal: 20,
        justifyContent: "center",
    },
    timer: {
        paddingBottom: height * 0.3,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: height*0.1,
    },
    finishButton: {
        alignSelf: "center",
        backgroundColor: COLORS.pistache,
        width: width * 0.2,
        height: width * 0.1,
        borderWidth: 2,
        borderRadius: 25,
        borderColor: COLORS.espresso,
        justifyContent: "center",
        alignItems: "center",
    },
});
