import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../constants/colors";
import SelectListCustom from "../components/SelectList";
import useAxios from "../utils/useAxios";
import { API_URL } from "../context/AuthContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { height, width } from "../constants/screen";
import { useBrewers } from "../context/BrewerContext";
import { Brewer } from "../types/Brewer";
import { RecipesScreenNavigationProp } from "../types/navigationTypes";

interface recipeNames {
    name: string;
    id: number;
}

interface RecipesProps {
    navigation: RecipesScreenNavigationProp;
}

const Recipes = ({ navigation }: RecipesProps) => {
    let api = useAxios();

    const [resetKey, setResetKey] = useState(0);
    const [brewer, setBrewer] = useState("");
    const [recipes, setRecipes] = useState<recipeNames[]>([]);
    const [isFirstRender, setIsFirstRender] = useState<boolean>(true);
    const { brewers } = useBrewers();

    const formattedBrewers = brewers.map((brewer: Brewer) => ({
        key: brewer.id.toString(),
        value: brewer.name,
    }));

    const getRecipes = async () => {
        if (brewer === "") {
            alert("You have to choose brewer");
        } else {
            try {
                const result = await api.get(
                    `${API_URL}/recipes/brewer/${brewer}`
                );
                setRecipes(result.data);
                return result;
            } catch (e: any) {
                const errorMessage =
                    e.response.data.error || "An error occurred";
                console.log(e);
                return { error: true, msg: errorMessage };
            }
        }
    };

    useEffect(() => {
        if (isFirstRender) {
            setIsFirstRender(false);
        } else {
            getRecipes();
        }
    }, [brewer]);

    type ItemProps = { name: string; id: number };

    const Item = ({ name, id }: ItemProps) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate("Recipe", { id })}
            >
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
                <SelectListCustom
                    value={brewer}
                    resetKey={resetKey}
                    onChange={setBrewer}
                    text="Select your brewer"
                    data={formattedBrewers}
                />
                {brewer === "" ? (
                    <Text style={styles.infoText}>
                        Your recipes will appear as soon as you choose your
                        brewer.
                    </Text>
                ) : recipes.length > 0 ? (
                    <View
                        style={[
                            styles.listBackground,
                            Platform.OS === "ios"
                                ? styles.shadow
                                : styles.elevation,
                        ]}
                    >
                        <FlatList
                            data={recipes}
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
                    </View>
                ) : (
                    <Text style={styles.infoText}>
                        No recipes found for this brewer
                    </Text>
                )}
            </View>
        </SafeAreaView>
    );
};

export default Recipes;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "flex-start",
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
