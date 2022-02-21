import React from "react";
import { View, Text } from "react-native";
import { Paragraph } from "react-native-paper";

const ErrorMessage = ({ message }) => {
  return (
    <Paragraph style={{ textAlign: "center", color: "red" }}>
      {message}
    </Paragraph>
  );
};

export default ErrorMessage;
