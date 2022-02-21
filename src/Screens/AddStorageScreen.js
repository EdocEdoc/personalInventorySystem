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
import React, { useState, useEffect } from "react";
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
  Dialog,
} from "react-native-paper";
import InputField from "../Components/InputField";
import ErrorMessage from "../Components/ErrorMessage";
import {
  DELETE_STORAGE,
  GET_STORAGE,
  GET_STORAGE_UID,
  INSERT_STORAGE,
  UPDATE_STORAGE,
} from "../database/Storage";
import { uid } from "uid";
import { Colors } from "../files/Colors";
const dimensions = {
  windowWidth: Dimensions.get("window").width,
  windowHeight: Dimensions.get("window").height,
};

import QRCode from "react-native-qrcode-svg";
import { DELETE_ITEMS } from "../database/Item";

const AddStorageScreen = ({ navigation, route }) => {
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const storageP = route.params?.storage;
  const [storage, setStorage] = useState(storageP);
  const passedUidP = route.params?.locUid;
  const [passedUid, setPassedUid] = useState(passedUidP);
  const [locUid, setUid] = useState(null);
  /* console.log(storage); */

  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const onUpdate = async () => {
    setIsLoading(true);
    try {
      if (name) {
        setErrorMsg(null);
        const data = {
          name: name,
          description: description,
          totalInside: storage.totalInside,
        };
        const res = await UPDATE_STORAGE(storage.id, data);
        if (res.success) {
          navigation.goBack();
        } else {
          setErrorMsg(res.failed.message);
        }
      } else {
        setErrorMsg("NAME is REQUIRED!");
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      if (name) {
        setErrorMsg(null);
        const data = {
          uid: locUid,
          name: name,
          date: new Date().toISOString(),
          description: description,
          totalInside: 0,
        };
        const res = await INSERT_STORAGE(data);
        if (res.success) {
          navigation.navigate("StoragesScreen");
        } else {
          setErrorMsg(res.failed.message);
        }
      } else {
        setErrorMsg("NAME is REQUIRED!");
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  const deleteStorage = async () => {
    try {
      const res = DELETE_STORAGE(storage?.id);
      const res2 = DELETE_ITEMS(storage?.id);
      hideDialog();
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  };

  const getStorageDetail = async () => {
    setIsLoading(true);
    try {
      const res = await GET_STORAGE_UID(passedUid);
      console.log(res);
      if (res.success.rows.length > 0) {
        setStorage(res.success?.rows[0]);
      } else {
        navigation.goBack();
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (storage) {
      setName(storage?.name);
      setDescription(storage?.description);
    }
    if (storage) {
      setUid(storage.uid);
    } else {
      if (!locUid) {
        setUid(uid(36));
      }
    }
  }, [storage, locUid]);

  useEffect(() => {
    console.log("storage.uid", storage?.uid);
    if (passedUid) {
      getStorageDetail();
      console.log("passedUid.uid", passedUid);
    }
  }, [passedUid]);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      contentContainerStyle={styles.container}
    >
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Alert!</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              This will delete this {storage?.name} storage and its items!
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>CANCEL</Button>
            <Button onPress={deleteStorage} labelStyle={{ color: "red" }}>
              CONFIRM
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <View style={{ padding: 10 }}>
        <Subheading style={{ marginHorizontal: 5 }}>NAME</Subheading>
        <TextInput
          mode="outlined"
          value={name}
          onChangeText={(text) => setName(text)}
          style={{ marginBottom: 10, marginHorizontal: 5 }}
        />
        <Subheading style={{ marginHorizontal: 5 }}>DESCRIPTION</Subheading>
        <TextInput
          mode="outlined"
          multiline={true}
          numberOfLines={3}
          style={{ marginBottom: 10, marginHorizontal: 5 }}
          value={description}
          onChangeText={(text) => setDescription(text)}
        />

        {storage ? (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("StorageQRScreen", { storage: storage })
            }
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 20,
            }}
          >
            <QRCode value={`${locUid}`} />
            <Caption>click to view</Caption>
          </TouchableOpacity>
        ) : (
          <Paragraph></Paragraph>
        )}

        {errorMsg ? (
          <ErrorMessage message={errorMsg} />
        ) : (
          <Paragraph></Paragraph>
        )}
        <Button
          labelStyle={{ padding: 5, fontSize: 16 }}
          icon={storage ? "pen" : "plus"}
          style={{
            marginBottom: 20,
            marginHorizontal: 5,
            ...(storage && { backgroundColor: Colors.lightpink }),
          }}
          mode="contained"
          loading={isLoading}
          disabled={isLoading}
          onPress={storage ? onUpdate : onSubmit}
        >
          {storage ? "UPDATE" : "ADD"}
        </Button>
        {storage && (
          <View>
            <Button
              labelStyle={{ padding: 5, fontSize: 16 }}
              icon={"plus"}
              style={{
                marginBottom: 20,
                marginHorizontal: 5,
                backgroundColor: Colors.lightgreen,
              }}
              mode="contained"
              loading={isLoading}
              disabled={isLoading}
              onPress={() =>
                navigation.navigate("ItemsScreen", { storage: storage })
              }
            >
              {`VIEW ITEMS (${storage?.totalInside})`}
            </Button>
            <View>
              <Button
                labelStyle={{ padding: 5, fontSize: 16, color: "white" }}
                icon={"trash-can"}
                style={{
                  marginBottom: 20,
                  marginHorizontal: 5,
                  backgroundColor: Colors.crimson,
                }}
                mode="contained"
                loading={isLoading}
                disabled={isLoading}
                onPress={showDialog}
              >
                {"DELETE STORAGE"}
              </Button>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default AddStorageScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
});
