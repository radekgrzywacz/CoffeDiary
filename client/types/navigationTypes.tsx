import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Login: undefined; // No params expected for Login
  Register: undefined; // No params expected for Register
  // Add other screens here if needed
};

export type RootTabParamList = {
  Profile: undefined;
  Home: undefined;
  Diary: undefined;
  Recipes: undefined
  New: undefined
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
