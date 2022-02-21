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
import {
  CHECK_IF_ACCOUNT,
  LOGIN,
  RECOVER_ACCOUNT,
  UPDATE_ACCOUNT,
} from "../database/Account";
import InputField from "../Components/InputField";
import ErrorMessage from "../Components/ErrorMessage";

const dimensions = {
  windowWidth: Dimensions.get("window").width,
  windowHeight: Dimensions.get("window").height,
};

const RecoverScreen = ({ navigation }) => {
  const [pin, setPin] = useState(null);
  const [cPin, setCPin] = useState(null);
  const [p01, setP01] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [account, setAccount] = useState(null);

  const onRecover = async () => {
    setIsLoading(true);
    try {
      setErrorMsg(null);
      if (p01) {
        const res = await RECOVER_ACCOUNT(p01);
        if (res.success) {
          setAccount(res.success.rows[0]);
        } else {
          setErrorMsg(res.failed.message);
        }
      } else {
        setErrorMsg("INPUT WORD/PHRASE");
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      setErrorMsg(null);
      if (pin && cPin) {
        if (pin === cPin) {
          console.log(account);
          const res = await UPDATE_ACCOUNT(pin, account?.id);
          if (res.success) {
            navigation.goBack();
          } else {
            setErrorMsg(res.failed.message);
          }
        } else {
          setErrorMsg("PINS does NOT match!");
        }
      } else {
        setErrorMsg("Fill-up PINS");
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };
  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/appAsset/pysisLogo.png")}
        style={{ resizeMode: "contain", width: dimensions.windowWidth * 0.5 }}
      />
      <Title
        style={{
          color: Colors.mediumseagreen,
          marginTop: -10,
          marginHorizontal: 20,
          textAlign: "center",
        }}
      >
        INPUT recovery WORD/PHRASE to RECOVER ACCOUNT
      </Title>
      <View
        style={{
          marginVertical: 20,
          width: "100%",
          alignItems: "center",
        }}
      >
        {account ? (
          <View>
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
            <TextInput
              mode="outlined"
              label={"CONFIRM PIN"}
              secureTextEntry={true}
              keyboardType="number-pad"
              value={cPin}
              onChangeText={(text) => setCPin(text)}
              style={{
                alignSelf: "center",
                marginVertical: 10,
                width: dimensions.windowWidth * 0.6,
                textAlign: "center",
              }}
            />
          </View>
        ) : (
          <TextInput
            mode="outlined"
            label={"WORD/PHRASE"}
            value={p01}
            onChangeText={(text) => setP01(text)}
            style={{
              alignSelf: "center",
              marginVertical: 10,
              width: dimensions.windowWidth * 0.6,
              textAlign: "center",
            }}
          />
        )}

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
            ...(account && { backgroundColor: Colors.lightpink }),
          }}
          loading={isLoading}
          disabled={isLoading}
          labelStyle={{
            fontSize: 16,
            color: "white",
            paddingHorizontal: 20,
          }}
          icon={account ? "check" : "recycle"}
          /* onPress={onLogin} */
          onPress={account ? onSubmit : onRecover}
        >
          {account ? "SUBMIT" : "RECOVER"}
        </Button>
        <Paragraph></Paragraph>
      </View>
    </View>
  );
};

export default RecoverScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
