import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Login: undefined; // No params expected for Login
  Register: undefined; // No params expected for Register
  // Add other screens here if needed
};

export type RootTabParamList = {
  Test: undefined;
  Home: undefined;
}

export type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
export type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;
export type TestScreenNavigationProp = BottomTabNavigationProp<RootTabParamList, 'Test'>;
export type HomeScreenNavigationProp = BottomTabNavigationProp<RootTabParamList, 'Home'>;
