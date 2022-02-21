import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Button,
  Paragraph,
  RadioButton,
  TextInput,
  Title,
} from "react-native-paper";
import { Colors } from "../files/Colors";
import InputField from "../Components/InputField";
import ErrorMessage from "../Components/ErrorMessage";
import { INSERT_USER_ACCOUNT } from "../database/Account";
import { uid } from "uid";

const dimensions = {
  windowWidth: Dimensions.get("window").width,
  windowHeight: Dimensions.get("window").height,
};

const RegisterScreen = ({ navigation }) => {
  const [password, setPassword] = useState(null);
  const [cPassword, setCPassword] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [p01, setP01] = useState(null);
  const [p02, setP02] = useState(null);
  const [p03, setP03] = useState(null);
  const [matched, setMatched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const errors = {
    password: { error: false, errorMessage: null },
    cPassword: { error: false, errorMessage: null },
    p01: { error: false, errorMessage: null },
    p02: { error: false, errorMessage: null },
    p03: { error: false, errorMessage: null },
  };

  const [errorField, setErrorField] = useState(errors);

  const postRegister = async () => {
    setIsLoading(true);
    try {
      const data = {
        uid: uid(32),
        pin: `${password}`,
        string01: p01,
        string02: p02,
        string03: p03,
      };
      const res = await INSERT_USER_ACCOUNT(data);
      if (res.success) {
        console.log(res);
        navigation.goBack();
      } else {
        setMatched(false);
        setErrorMsg("Registration Failed!");
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  const checkContent = (errorsStats) => {
    let haveError = false;
    let errorContent = errorsStats;

    if (password) {
      errorContent.password.error = false;
      errorContent.password.errorMessage = null;
    } else {
      errorContent.password.error = true;
      errorContent.password.errorMessage = "Required";
    }

    if (cPassword) {
      errorContent.cPassword.error = false;
      errorContent.cPassword.errorMessage = null;
    } else {
      haveError = true;
      errorContent.cPassword.error = true;
      errorContent.cPassword.errorMessage = "Required";
    }

    if (matched) {
      if (p01) {
        errorContent.p01.error = false;
        errorContent.p01.errorMessage = null;
      } else {
        haveError = true;
        errorContent.p01.error = true;
        errorContent.p01.errorMessage = "Required";
      }

      if (p02) {
        errorContent.p02.error = false;
        errorContent.p02.errorMessage = null;
      } else {
        haveError = true;
        errorContent.p02.error = true;
        errorContent.p02.errorMessage = "Required";
      }

      if (p03) {
        errorContent.p03.error = false;
        errorContent.p03.errorMessage = null;
      } else {
        haveError = true;
        errorContent.p03.error = true;
        errorContent.p03.errorMessage = "Required";
      }
    }

    return { error: haveError, returnedErrors: errorContent };
  };

  const onRegister = async () => {
    let c = checkContent(errors);
    setErrorField(errors);
    if (!c.error) {
      setErrorMsg(null);
      if (cPassword === password) {
        setMatched(true);
        postRegister();
      } else {
        setMatched(false);
        setErrorMsg("Passwords does not matched!");
      }
    } else setErrorMsg("Error occurred: Double check input fields");
    setErrorField(c.returnedErrors);
  };

  const onSubmit = () => {
    let c = checkContent(errors);
    setErrorField(errors);
    if (!c.error) {
      setErrorMsg(null);
      if (cPassword === password) {
        setMatched(true);
      } else {
        setMatched(false);
        setErrorMsg("Passwords does not matched!");
      }
    } else setErrorMsg("Error occurred: Double check input fields");
    setErrorField(c.returnedErrors);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/appAsset/pysisLogo.png")}
        style={{ resizeMode: "contain", width: dimensions.windowWidth * 0.5 }}
      />
      <Title style={{ color: Colors.mediumseagreen, marginTop: -10 }}>
        {matched
          ? "Input THREE WORDS/PHRASES for ACCOUNT RECOVERY"
          : "Input PIN to REGISTER"}
      </Title>
      <View
        style={{
          marginVertical: 20,
          width: "100%",
          alignItems: "center",
        }}
      >
        {!matched ? (
          <View>
            <InputField
              mode="outlined"
              label="PIN"
              keyboardType="number-pad"
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={{
                alignSelf: "center",
                marginVertical: 10,
                width: dimensions.windowWidth * 0.6,
                textAlign: "center",
              }}
              error={errorField.password.error}
              withError={errorField.password.error}
              errorMessage={errorField.password.errorMessage}
            />
            <InputField
              mode="outlined"
              label="CONFIRM PIN"
              keyboardType="number-pad"
              value={cPassword}
              onChangeText={(text) => setCPassword(text)}
              secureTextEntry={true}
              style={{
                alignSelf: "center",
                marginVertical: 10,
                width: dimensions.windowWidth * 0.6,
                textAlign: "center",
              }}
              error={errorField.cPassword.error}
              withError={errorField.cPassword.error}
              errorMessage={errorField.cPassword.errorMessage}
            />
          </View>
        ) : (
          <View>
            <InputField
              mode="outlined"
              keyboardType="default"
              value={p01}
              onChangeText={(text) => setP01(text)}
              secureTextEntry={true}
              style={{
                alignSelf: "center",
                marginVertical: 5,
                width: dimensions.windowWidth * 0.6,
                textAlign: "center",
              }}
              error={errorField.p01.error}
              withError={errorField.p01.error}
              errorMessage={errorField.p01.errorMessage}
            />
            <InputField
              mode="outlined"
              keyboardType="default"
              value={p02}
              onChangeText={(text) => setP02(text)}
              secureTextEntry={true}
              style={{
                alignSelf: "center",
                marginVertical: 5,
                width: dimensions.windowWidth * 0.6,
                textAlign: "center",
              }}
              error={errorField.p02.error}
              withError={errorField.p02.error}
              errorMessage={errorField.p02.errorMessage}
            />
            <InputField
              mode="outlined"
              keyboardType="default"
              value={p03}
              onChangeText={(text) => setP03(text)}
              style={{
                alignSelf: "center",
                marginVertical: 5,
                width: dimensions.windowWidth * 0.6,
                textAlign: "center",
              }}
              error={errorField.p03.error}
              withError={errorField.p03.error}
              errorMessage={errorField.p03.errorMessage}
            />
          </View>
        )}

        <Paragraph></Paragraph>

        {errorMsg ? (
          <ErrorMessage message={errorMsg} />
        ) : (
          <Paragraph></Paragraph>
        )}
        <Button
          mode="contained"
          loading={isLoading}
          disabled={isLoading}
          style={{
            elevation: 0,
            marginBottom: 20,
            ...(matched && { backgroundColor: Colors.lightgreen }),
          }}
          labelStyle={{ fontSize: 16, color: "white" }}
          icon="check"
          onPress={matched ? onRegister : onSubmit}
        >
          {matched ? "REGISTER" : "SUBMIT"}
        </Button>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
