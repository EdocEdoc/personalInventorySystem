import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  IconButton,
  RadioButton,
  Surface,
  TextInput,
  Title,
} from "react-native-paper";
import { Colors } from "../files/Colors";

const dimensions = {
  windowWidth: Dimensions.get("window").width,
  windowHeight: Dimensions.get("window").height,
};

const DashBoard = ({ navigation }) => {
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <Image
        source={require("../../assets/appAsset/pysisLogo.png")}
        style={{ resizeMode: "contain", width: dimensions.windowWidth * 0.5 }}
      />
      <View>
        <TouchableOpacity
          style={{ borderRadius: 15 }}
          onPress={() => navigation.navigate("ScanStorageScreen")}
        >
          <Surface
            style={[styles.surfaceStyle, { backgroundColor: Colors.lightpink }]}
          >
            <Image
              source={require("../../assets/appAsset/scan.png")}
              style={{
                resizeMode: "contain",
                width: dimensions.windowWidth * 0.2,
              }}
            />
            <View>
              <Title
                style={{ fontSize: 24, fontWeight: "bold", marginBottom: -5 }}
              >
                SCAN
              </Title>
              <Title
                style={{ fontSize: 24, fontWeight: "bold", marginBottom: -5 }}
              >
                STORAGE
              </Title>
            </View>
          </Surface>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ borderRadius: 15 }}
          onPress={() => navigation.navigate("AddStorageScreen")}
        >
          <Surface
            style={[
              styles.surfaceStyle,
              { backgroundColor: Colors.lightgreen },
            ]}
          >
            <Image
              source={require("../../assets/appAsset/storage.png")}
              style={{
                resizeMode: "contain",
                width: dimensions.windowWidth * 0.18,
                marginVertical: -10,
              }}
            />
            <View>
              <Title
                style={{ fontSize: 24, fontWeight: "bold", marginBottom: -5 }}
              >
                ADD
              </Title>
              <Title
                style={{ fontSize: 24, fontWeight: "bold", marginBottom: -5 }}
              >
                STORAGE
              </Title>
            </View>
          </Surface>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ borderRadius: 15 }}
          onPress={() => navigation.navigate("StoragesScreen")}
        >
          <Surface
            style={[
              styles.surfaceStyle,
              { backgroundColor: Colors.lightskyblue },
            ]}
          >
            <Image
              source={require("../../assets/appAsset/book.png")}
              style={{
                resizeMode: "contain",
                width: dimensions.windowWidth * 0.18,
                marginVertical: -10,
              }}
            />
            <View>
              <Title
                style={{ fontSize: 24, fontWeight: "bold", marginBottom: -5 }}
              >
                VIEW
              </Title>
              <Title
                style={{ fontSize: 24, fontWeight: "bold", marginBottom: -5 }}
              >
                STORAGE
              </Title>
            </View>
          </Surface>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default DashBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  surfaceStyle: {
    borderWidth: 2,
    borderColor: Colors.dimgrey,
    borderRadius: 15,
    flexDirection: "row",
    padding: 10,
    paddingRight: 20,

    margin: 10,
    elevation: 10,
    alignItems: "center",
    height: 90,
  },
});
