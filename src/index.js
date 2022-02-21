import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useState, useEffects } from "react";
import {
  ActivityIndicator,
  IconButton,
  RadioButton,
  Surface,
  TextInput,
  Title,
  Searchbar,
  Caption,
  Paragraph,
  Divider,
  FAB,
  Portal,
  Provider,
  Subheading,
  Button,
} from "react-native-paper";
import { Colors } from "./files/Colors";

const dimensions = {
  windowWidth: Dimensions.get("window").width,
  windowHeight: Dimensions.get("window").height,
};

const MainApp = () => {
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <View style={{ padding: 10 }}>
        <Subheading style={{ marginHorizontal: 5 }}>NAME</Subheading>
        <TextInput
          mode="outlined"
          style={{ marginBottom: 10, marginHorizontal: 5 }}
        />
        <Subheading style={{ marginHorizontal: 5 }}>QUANTITY</Subheading>
        <TextInput
          mode="outlined"
          keyboardType="phone-pad"
          style={{ marginBottom: 10, marginHorizontal: 5 }}
        />
        <Subheading style={{ marginHorizontal: 5 }}>DESCRIPTION</Subheading>
        <TextInput
          mode="outlined"
          multiline={true}
          numberOfLines={10}
          style={{ marginBottom: 10, marginHorizontal: 5 }}
        />
        <Button
          labelStyle={{ padding: 5, fontSize: 16 }}
          icon="plus"
          style={{ marginVertical: 20, marginHorizontal: 5 }}
          mode="contained"
          onPress={() => {}}
        >
          ADD
        </Button>
      </View>
    </ScrollView>
  );
};

export default MainApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
