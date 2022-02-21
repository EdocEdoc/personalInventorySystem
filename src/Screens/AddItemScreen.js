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
import { Colors } from "../files/Colors";
import { DELETE_ITEM, INSERT_ITEM, UPDATE_ITEM } from "../database/Item";
import ErrorMessage from "../Components/ErrorMessage";
import { UPDATE_STORAGE } from "../database/Storage";

const dimensions = {
  windowWidth: Dimensions.get("window").width,
  windowHeight: Dimensions.get("window").height,
};

const AddItemScreen = ({ navigation, route }) => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const storage = route.params?.storage;
  const locItem = route.params?.locItem;

  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const deleteStorage = async () => {
    try {
      const res2 = await DELETE_ITEM(locItem?.id);
      if (res2.success) {
        const data = { ...storage, totalInside: storage?.totalInside - 1 };
        const res3 = await UPDATE_STORAGE(storage?.id, data);
        if (res3.success) {
          hideDialog();
          navigation.goBack();
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onUpdate = async () => {
    setIsLoading(true);
    try {
      if (name) {
        setErrorMsg(null);
        const data = {
          name: name,
          description: description,
          quantity: quantity || 0,
        };
        const res = await UPDATE_ITEM(locItem.id, data);
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
          storageId: storage?.id || 0,
          name: name,
          date: new Date().toISOString(),
          description: description,
          quantity: quantity || 0,
        };
        const res = await INSERT_ITEM(data);
        if (res.success) {
          const data2 = {
            ...storage,
            totalInside: storage.totalInside + 1,
          };
          const res2 = await UPDATE_STORAGE(storage?.id, data2);
          if (res2.success) {
            navigation.goBack();
          } else {
            setErrorMsg(res2.failed.message);
          }
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

  useEffect(() => {
    if (locItem) {
      setName(locItem?.name);
      setDescription(locItem?.description);
      setQuantity(locItem?.quantity);
    }
  }, []);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      contentContainerStyle={styles.container}
    >
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Alert!</Dialog.Title>
          <Dialog.Content>
            <Paragraph>This will delete this {locItem?.name}!</Paragraph>
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
        <Subheading style={{ marginHorizontal: 5 }}>QUANTITY</Subheading>
        <TextInput
          mode="outlined"
          keyboardType="number-pad"
          value={quantity ? `${quantity}` : quantity}
          onChangeText={(text) => setQuantity(text)}
          style={{ marginBottom: 10, marginHorizontal: 5 }}
        />
        <Subheading style={{ marginHorizontal: 5 }}>DESCRIPTION</Subheading>
        <TextInput
          mode="outlined"
          multiline={true}
          numberOfLines={4}
          value={description}
          onChangeText={(text) => setDescription(text)}
          style={{ marginBottom: 10, marginHorizontal: 5 }}
        />
        {errorMsg ? (
          <ErrorMessage message={errorMsg} />
        ) : (
          <Paragraph></Paragraph>
        )}

        {locItem ? (
          <View>
            <Button
              labelStyle={{ padding: 5, fontSize: 16 }}
              icon={"pen"}
              style={{
                marginBottom: 20,
                marginHorizontal: 5,
                backgroundColor: Colors.lightpink,
              }}
              mode="contained"
              loading={isLoading}
              disabled={isLoading}
              onPress={onUpdate}
            >
              UPDATE
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
                {"DELETE ITEM"}
              </Button>
            </View>
          </View>
        ) : (
          <Button
            labelStyle={{ padding: 5, fontSize: 16 }}
            icon="plus"
            style={{ marginBottom: 20, marginHorizontal: 5 }}
            mode="contained"
            onPress={onSubmit}
            loading={isLoading}
            disabled={isLoading}
          >
            ADD
          </Button>
        )}
      </View>
    </ScrollView>
  );
};

export default AddItemScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
});
