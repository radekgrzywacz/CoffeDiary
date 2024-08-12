import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import { COLORS } from "../../constants/colors";
import { Link } from "expo-router";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const screen = Dimensions.get("screen");

export default function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../assets/Dripper-Outline.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <View>
        <Text style={styles.logoFont}>Coffee Diary</Text>
      </View>

      <View style={styles.loginModule}>
        <Text style={{ fontFamily: "medium", fontSize: 27, color: COLORS.espresso }}>Sign in</Text>
        <View style={styles.form}>
          <Ionicons name="person" style={styles.icon} />

          <TextInput
            style={styles.textInput}
            onChangeText={setLogin}
            value={login}
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect={false}
            placeholder="Login"
          />
        </View>
        <View style={styles.form}>
          <Ionicons name="key" style={styles.icon} />

          <TextInput
            style={styles.textInput}
            onChangeText={setPassword}
            value={password}
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect={false}
            placeholder="Password"
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity onPress={() => console.log("Sign in")}>
          <View style={styles.submitButton}>
            <Text style={styles.submitText}>Sign in</Text>
          </View>
        </TouchableOpacity>
        <View style={{ flexDirection: "column", alignItems: "flex-end" }}>
          <TouchableOpacity onPress={() => console.log("Forgot Password?")}>
            <Text style={{ fontFamily: "light" }}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          alignSelf: "center",
          flexDirection: "row",
          width: screen.width * 0.9,
          paddingHorizontal: 10,
          marginTop: "-15%",
          //marginStart: "-5%",
          //borderWidth: 2
        }}
      >
        <View
          style={{
            borderWidth: 0.6,
            borderColor: COLORS.espresso,
            width: "50%",
            height: 1,
            marginTop: 10,
            marginStart: "-3.7%",
          }}
        />
        <Text
          style={{
            fontFamily: "regular",
            paddingHorizontal: 4,
            color: COLORS.espresso,
          }}
        >
          Or
        </Text>
        <View
          style={{
            borderWidth: 0.6,
            borderColor: COLORS.espresso,
            width: "50%",
            height: 1,
            marginTop: 10,
          }}
        />
      </View>
      <View style={{marginTop: "10%"}}>
        <TouchableOpacity onPress={() => console.log("Facebook login")}>
          <View style={styles.facebook}>
            <Text style={{fontSize: 25, color: "blue"}}>Facebook</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Link style={{ marginTop: 70, flexDirection: "row" }} href="/auth/register">
          <Text style={{fontFamily: "medium"}}>You don't have an account? </Text>
        <Text style={{fontFamily: "bold"}}>Sign up!</Text>
      </Link>
      <Link href="../tabs">Tabs</Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor: COLORS.almond,
  },
  logo: {
    width: "50%",
    height: "30%",
  },
  logoFont: {
    fontFamily: "bold",
    fontSize: 36,
    marginTop: -20,
    color: COLORS.espresso,
  },
  loginModule: {
    marginTop: 30,
  },
  form: {
    height: "13%",
    width: screen.width * 0.8,
    borderWidth: 3,
    borderRadius: 8,
    borderColor: COLORS.espresso,
    backgroundColor: COLORS.vanilla,
    marginTop: "3%",
    flexDirection: "row",
    paddingStart: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 25,
    fontFamily: "regular",
  },
  icon: {
    fontSize: 25,
    marginTop: 5,
    marginEnd: 6,
    color: COLORS.espresso,
  },
  submitButton: {
    // height: "16%",
    //width: "80%",
    borderWidth: 3,
    borderRadius: 8,
    borderColor: COLORS.espresso,
    backgroundColor: COLORS.pistache,
    marginTop: "3%",
    alignItems: "center",
  },
  submitText: {
    fontSize: 25,
    fontFamily: "regular",
    color: COLORS.espresso,
  },
  facebook: {
    borderWidth: 3,
    borderRadius: 8,
    borderColor: "blue",
    backgroundColor: "white",
    marginTop: "3%",
    alignItems: "center", 
    width: screen.width * 0.8
  }
});
