import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "../constants/colors";
import { RouteProp, useRoute } from "@react-navigation/native";
import { API_URL } from "../context/AuthContext";
import useAxios from "../utils/useAxios";

type RecipeDetailsRouteProp = RouteProp<{ Recipe: { id: number } }, "Recipe">;

const RecipeDetails = () => {
    const route = useRoute<RecipeDetailsRouteProp>();
    const { id } = route.params;
    const api = useAxios();

    const getRecipeDetails = async () => {
        try {
            const fetchedRecipe = api.get(`${API_URL}/recipes/${id}`);
        } catch (e: any) {
            const errorMessage = e.response.data.error || "An error occurred";
            console.log(e);
            return { error: true, msg: errorMessage };
        }
    };

    return (
        <SafeAreaView>
            <Text>Recipe nr {id}</Text>
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
    mediumText: {
        fontFamily: "medium",
        fontSize: 19,
    },
    innerContainer: {
        paddingHorizontal: 20,
    },
});
