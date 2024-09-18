import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigationTypes";
import Recipes from "../screens/Recipes";
import RecipeDetails from "../screens/RecipeDetails";

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
        </Stack.Navigator>
    );
}

export default RecipesStack;
