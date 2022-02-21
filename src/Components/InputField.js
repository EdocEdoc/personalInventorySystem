import { View, Text } from "react-native";
import React from "react";
import { HelperText, TextInput } from "react-native-paper";

const InputField = ({ containerStyle, withError, errorMessage, ...rest }) => {
  return (
    <View style={containerStyle}>
      <TextInput {...rest} />
      {withError && (
        <HelperText type="error" visible={withError}>
          {errorMessage}
        </HelperText>
      )}
    </View>
  );
};

export default InputField;
