import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  Caption,
  Paragraph,
  Subheading,
  Surface,
  Title,
} from "react-native-paper";
import QRCode from "react-native-qrcode-svg";
import { Colors } from "../files/Colors";

const StorageQRScreen = ({ navigation, route }) => {
  const storage = route.params?.storage;

  return (
    <View style={styles.container}>
      <Title>{storage?.name}</Title>
      <Paragraph></Paragraph>
      <Surface style={{ padding: 20, elevation: 5, margin: 10 }}>
        <QRCode value={storage?.uid} size={200} />
      </Surface>
      <Paragraph></Paragraph>
      <Subheading>{storage?.description}</Subheading>
      <Paragraph>Total number inside: {storage?.totalInside}</Paragraph>

      <Paragraph></Paragraph>
      <Caption style={{ textAlign: "center", paddingHorizontal: 10 }}>
        Please take a screenshot of this to label your physical storage.
      </Caption>
    </View>
  );
};

export default StorageQRScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});
