import { View, Text } from "react-native";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { Recipe } from "../types/Recipe";
import useAxios from "../utils/useAxios";
import { API_URL } from "./AuthContext";

interface RecipeContextType {
    addRecipe: (recipe: Recipe) => Promise<void>;
    refreshRecipes: number;
}

interface recipeNames {
    name: string;
    id: number;
}
const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const RecipeProvider = ({ children }: { children: ReactNode }) => {
    const api = useAxios();
    const [refreshRecipes, setRefreshRecipes] = useState(0);

    const addRecipe = async (recipe: Recipe) => {
        try {
            await api.post(`${API_URL}/recipes`, recipe);
            setRefreshRecipes(refreshRecipes + 1);
        } catch (error: any) {
            console.error(error);
        }
    };

    return (
        <RecipeContext.Provider value={{ addRecipe, refreshRecipes }}>
            {children}
        </RecipeContext.Provider>
    );
};

export const useRecipes = (): RecipeContextType => {
    const context = useContext(RecipeContext);
    if (!context) {
        throw new Error("useRecipe must be used within a RecipeProvider");
    }
    return context;
};
