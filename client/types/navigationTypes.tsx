import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    ProfileScreen: undefined;
    Brewers: undefined;
    Grinders: undefined;
    BrewerDetails: undefined;
    Recipes: undefined;
    Recipe: undefined;
};

export type RootTabParamList = {
    Profile: undefined;
    Recipes: undefined;
    Home: undefined;
    Diary: undefined;
    New: undefined;
};

export type LoginScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "Login"
>;
export type RegisterScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "Register"
>;
export type ProfileScreenNavigationProp = BottomTabNavigationProp<
    RootTabParamList,
    "Profile"
>;
export type HomeScreenNavigationProp = BottomTabNavigationProp<
    RootTabParamList,
    "Home"
>;
export type DiaryScreenNavigationProp = BottomTabNavigationProp<
    RootTabParamList,
    "Diary"
>;
export type RecipesScreenNavigationProp = BottomTabNavigationProp<
    RootTabParamList,
    "Recipes"
>;
export type NewScreenNavigationProp = BottomTabNavigationProp<
    RootTabParamList,
    "New"
>;
export type BrewersScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "Brewers"
>;
export type GrindersScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "Grinders"
>;
export type RecipesListScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "Recipes"
>;
export type ProfileScreenScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "ProfileScreen"
>;
export type BrewerDetailsScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "BrewerDetails"
>;
export type RecipeDetailScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "Recipe"
>;
