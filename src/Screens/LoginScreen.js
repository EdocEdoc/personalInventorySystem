import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Button,
  Paragraph,
  RadioButton,
  TextInput,
  Title,
} from "react-native-paper";
import { Colors } from "../files/Colors";
import { CHECK_IF_ACCOUNT, LOGIN } from "../database/Account";
import InputField from "../Components/InputField";
import ErrorMessage from "../Components/ErrorMessage";

const dimensions = {
  windowWidth: Dimensions.get("window").width,
  windowHeight: Dimensions.get("window").height,
};

const LoginScreen = ({ navigation }) => {
  const [pin, setPin] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkIfThereIsAccount = async () => {
    try {
      const res = await CHECK_IF_ACCOUNT();
      /* console.log("login", res); */
      if (res.success) {
      } else {
        navigation.navigate("RegisterScreen");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onLogin = async () => {
    setIsLoading(true);
    try {
      if (pin) {
        setErrorMsg(null);
        const res = await LOGIN(`${pin}`);
        if (res.success) {
          setErrorMsg(null);
          navigation.replace("DashBoard");
        } else {
          setErrorMsg(res.failed.error);
        }
      } else {
        setErrorMsg("PLEASE INPUT PIN");
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    checkIfThereIsAccount();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/appAsset/pysisLogo.png")}
        style={{ resizeMode: "contain", width: dimensions.windowWidth * 0.5 }}
      />
      <Title style={{ color: Colors.dodgerblue, marginTop: -10 }}>
        Input PIN to LOGIN
      </Title>
      <View
        style={{
          marginVertical: 20,
          width: "100%",
          alignItems: "center",
        }}
      >
        <TextInput
          mode="outlined"
          label={"PIN"}
          keyboardType="number-pad"
          secureTextEntry={true}
          value={pin}
          onChangeText={(text) => setPin(text)}
          style={{
            alignSelf: "center",
            marginVertical: 10,
            width: dimensions.windowWidth * 0.6,
            textAlign: "center",
          }}
        />

        <Paragraph></Paragraph>

        {errorMsg ? (
          <ErrorMessage message={errorMsg} />
        ) : (
          <Paragraph></Paragraph>
        )}
        <Button
          mode="contained"
          style={{
            elevation: 0,
            marginBottom: 20,
            backgroundColor: Colors.mediumseagreen,
          }}
          loading={isLoading}
          disabled={isLoading}
          labelStyle={{ fontSize: 16, color: "white", paddingHorizontal: 20 }}
          icon="login"
          onPress={onLogin}
        >
          LOGIN
        </Button>
        <Paragraph></Paragraph>
        <TouchableOpacity onPress={() => navigation.navigate("RecoverScreen")}>
          <Paragraph style={{ color: Colors.lightskyblue }}>
            Forgot PIN?
          </Paragraph>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
