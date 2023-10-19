import React, { Component, useState } from "react";
import { Button, Card } from "react-native-elements";
import { StyleSheet, View, Text, TextInput, NativeModules } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDownPicker from "react-native-dropdown-picker";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      jumlahRonde: "",

      levelDropdownIsOpen: false,
      level: "gampang",
      levelOptions: [
        { label: "Gampang", value: "gampang" },
        { label: "Sedang", value: "sedang" },
        { label: "Sulit", value: "sulit" },
      ],
    };

    this.setLevelDropdownValue = this.setLevelDropdownValue.bind(this);
  }

  setLevelDropdownValue(callback) {
    this.setState((state) => ({
      level: callback(state.level),
    }));
  }

  setLevelDropdownItems(callback) {
    this.setState((state) => ({
      levelOptions: callback(state.levelOptions),
    }));
  }

  doLogin = async (username, jumlahRonde, level) => {
    if(username == "" || jumlahRonde == "" || level == "") {
      alert("Tolong isi semua form");
    }
    if(jumlahRonde < 1 || jumlahRonde > 10) {
      alert("Jumlah ronde harus diantara 1 sampai 10");
    }
    else if ((username, jumlahRonde, level)) {
      try {
        await AsyncStorage.setItem("username", username);
        await AsyncStorage.setItem("jumlahRonde", jumlahRonde);
        await AsyncStorage.setItem("level", level);
        // alert("Login Sukses");
        navigation.navigate('Game', { screen: 'Game' });
      } catch (e) { 
        
      }
    } 
  };
  render() {
    return (
      <Card>
        <Card.Title>Setup Permainan</Card.Title>
        <Card.Divider />

        <View style={{}}>
          <Text>Nama Pemain</Text>
          <TextInput
            style={styles.input}
            onChangeText={(username) => this.setState({ username })}
          />
        </View>

        <View style={{}}>
          <Text>Jumlah Ronde</Text>
          <TextInput
            style={styles.input}
            onChangeText={(jumlahRonde) => this.setState({ jumlahRonde })}
          />
        </View>

        <View
          style={{
            zIndex: 10,
          }}
        >
          <Text>Tingkat Kesulitan</Text>
          <DropDownPicker
            open={this.state.levelDropdownIsOpen}
            setOpen={(x) => {
              this.setState({ levelDropdownIsOpen: x });
            }}
            value={this.state.level}
            setValue={this.setLevelDropdownValue}
            items={this.state.levelOptions}
            setItems={this.setLevelDropdownItems}
          />
        </View>

        <Button
          title="Submit"
          onPress={() =>
            this.doLogin(
              this.state.username,
              this.state.jumlahRonde,
              this.state.level,
            )
          }
        />
      </Card>
    );
  }
}
export default Login;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 10,
  },
  button: {
    marginTop: 10,
  },
});
