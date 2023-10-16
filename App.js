import React, { Component, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, NativeModules } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from "./screen/Login";
import Game from "./screen/Game";
import Finish from "./screen/Finish";
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const cekLogin = async () => {
  try {
    const value = await AsyncStorage.getItem("username");
    // alert(value);
    global.activeuser = value;
    if (value !== null) {
      return true;
    }
  } catch (e) {
    // error reading value
  }
};

const doLogout = async () => {
  try {
    await AsyncStorage.removeItem("username");
    alert("Logout Success");
    NativeModules.DevSettings.reload();
  } catch (e) {}
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      islogin: false,
    };

    cekLogin().then((item) => {
      if (item != null) {
        this.setState(
          (this.state = {
            islogin: true,
          })
        );
      }
    });
  }

  render() {
    if (!this.state.islogin) {
      return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    } else {
      return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Game" component={Game} />
            <Stack.Screen name="Finish" component={Finish} options={{headerLeft: null}} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
  }
}