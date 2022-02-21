import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native-paper";

const dimensions = {
  windowWidth: Dimensions.get("window").width,
  windowHeight: Dimensions.get("window").height,
};

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/appAsset/pysisLogoWithText.png")}
        style={{ resizeMode: "contain", width: dimensions.windowWidth * 0.6 }}
      />
      <ActivityIndicator size={"large"} />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
