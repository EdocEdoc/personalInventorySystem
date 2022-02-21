import React from "react";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Colors } from "../files/Colors";
import AppStack from "./AppStack";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.lightskyblue,
    accent: Colors.lightpink,
  },
};

const Providers = () => {
  return (
    <PaperProvider theme={theme}>
      <AppStack />
    </PaperProvider>
  );
};

export default Providers;
