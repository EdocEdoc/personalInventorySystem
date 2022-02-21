import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoadingScreen from "../Screens/LoadingScreen";
import RegisterScreen from "../Screens/RegisterScreen";
import DashBoard from "../Screens/DashBoard";
import StoragesScreen from "../Screens/StoragesScreen";
import ItemsScreen from "../Screens/ItemsScreen";
import LoginScreen from "../Screens/LoginScreen";
import AddStorageScreen from "../Screens/AddStorageScreen";
import StorageQRScreen from "../Screens/StorageQRScreen";
import AddItemScreen from "../Screens/AddItemScreen";
import RecoverScreen from "../Screens/RecoverScreen";
import ScanStorageScreen from "../Screens/ScanStorageScreen";

const Stack = createStackNavigator();
const AppStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="RecoverScreen"
          component={RecoverScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DashBoard"
          component={DashBoard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StoragesScreen"
          initialParams={{ storage: null }}
          component={StoragesScreen}
          options={{ title: "Storages" }}
        />
        <Stack.Screen
          name="AddStorageScreen"
          component={AddStorageScreen}
          initialParams={{ storage: null, locUid: null }}
          options={{ title: "Storage" }}
        />
        <Stack.Screen
          name="AddItemScreen"
          initialParams={{ storage: null, locItem: null }}
          component={AddItemScreen}
          options={{ title: "Items" }}
        />
        <Stack.Screen
          name="StorageQRScreen"
          initialParams={{ storage: null }}
          component={StorageQRScreen}
          options={{ title: "" }}
        />
        <Stack.Screen
          name="ScanStorageScreen"
          component={ScanStorageScreen}
          options={{ title: "Scan Storage QR" }}
        />
        <Stack.Screen
          name="ItemsScreen"
          component={ItemsScreen}
          initialParams={{ storage: null }}
          options={{ title: "Items" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
