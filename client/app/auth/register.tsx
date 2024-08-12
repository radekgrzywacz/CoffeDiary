import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/colors";

export default function Register() {
  return (
    <View style={{flex: 1}}>
      <View style={{ backgroundColor: COLORS.matcha, flex: 1 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    //backgroundColor: COLORS.black,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
    color: COLORS.pistache,
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
