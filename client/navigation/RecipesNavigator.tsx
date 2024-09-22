import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigationTypes";
import Recipes from "../screens/Recipes";
import RecipeDetails from "../screens/RecipeDetails";
import RecipeInstruction from "../screens/RecipeInstruction";

const Stack = createStackNavigator<RootStackParamList>();

function RecipesStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Recipes" component={Recipes} />
            <Stack.Screen name="Recipe" component={RecipeDetails} />
            <Stack.Screen
                name="RecipeInstruction"
                component={RecipeInstruction}
            />
        </Stack.Navigator>
    );
}

export default RecipesStack;
