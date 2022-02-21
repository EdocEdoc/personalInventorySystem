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
  Dialog,
  Button,
} from "react-native-paper";
import { Colors } from "../files/Colors";
import { DROP_STORAGE, GET_STORAGES } from "../database/Storage";
import { DROP_ITEMS } from "../database/Item";

const StoragesScreen = ({ navigation, route }) => {
  const [items, setItems] = useState([]);
  const [itemsBase, setItemsBase] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  const [searchQuery, setSearchQuery] = useState(null);
  const onChangeSearch = (query) => setSearchQuery(query);
  useEffect(() => {
    if (searchQuery) {
      let searchNames = itemsBase.filter(
        (item) =>
          item.name.toUpperCase().includes(searchQuery.toUpperCase()) ||
          item.description.toUpperCase().includes(searchQuery.toUpperCase())
      );
      if (searchNames) {
        setItems(searchNames);
      } else {
        setItems(itemsBase);
      }
    } else {
      setItems(itemsBase);
    }
  }, [searchQuery]);

  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const getStorages = async () => {
    setIsLoading(true);
    try {
      /* const res = await DROP_STORAGE(); */
      const res = await GET_STORAGES();
      if (res.success) {
        setItems(res.success.rows);
        setItemsBase(res.success.rows);
      } else {
        setItems([]);
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  const deleteAll = async () => {
    try {
      const res1 = await DROP_STORAGE();
      const res2 = await DROP_ITEMS();
      hideDialog();
      await getStorages();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getStorages();
  }, []);

  const renderContent = ({ item }) => {
    return (
      <TouchableOpacity
        style={{ paddingHorizontal: 15, paddingTop: 10 }}
        onPress={() =>
          navigation.navigate("AddStorageScreen", { storage: item })
        }
      >
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Paragraph style={{ textAlign: "left", flex: 2 }}>
            {item.name}
          </Paragraph>
          <Caption style={{ textAlign: "left", flex: 3 }}>
            {item.description}
          </Caption>
          <Paragraph style={{ textAlign: "center", flex: 1 }}>
            {item?.totalInside}
          </Paragraph>
        </View>
        <Divider style={{ marginTop: 8, marginBottom: 2 }} />
      </TouchableOpacity>
    );
  };

  return (
    <Provider>
      <Portal>
        <FAB.Group
          open={open}
          icon={open ? "cog" : "plus"}
          actions={[
            {
              label: "Add Storage",
              icon: "plus",
              small: false,
              onPress: () => navigation.navigate("AddStorageScreen"),
            },
            {
              icon: "refresh",
              label: "Refresh",
              onPress: () => getStorages(),
              small: false,
            },
            {
              icon: "trash-can",
              label: "DELETE ALL",
              onPress: () => showDialog(),
              small: true,
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Caution</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              This will delete all storage and its item data!
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>CANCEL</Button>
            <Button onPress={deleteAll} labelStyle={{ color: "red" }}>
              CONFIRM
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <View style={styles.container}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={{
            elevation: 5,
            margin: 10,
          }}
        />
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Title>Name</Title>
          <Title>Description</Title>
          <Title>Inside</Title>
        </View>
        <FlatList
          data={items}
          renderItem={renderContent}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => getStorages()}
            />
          }
          ListFooterComponent={() => (
            <Caption
              style={{
                margin: 20,
                textAlign: "center",
                marginBottom: 50,
              }}
            >
              PULL DOWN TO REFRESH
            </Caption>
          )}
        />
      </View>
    </Provider>
  );
};

export default StoragesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
