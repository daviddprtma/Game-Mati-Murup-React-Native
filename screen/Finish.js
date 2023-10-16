import React, { Component} from "react";
import { StyleSheet, View, Text, NativeModules} from "react-native";
import { Button, Card } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

class Finish extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.route.params.username,
      jumlahRonde: this.props.route.params.ronde,
      highscore: null,
      highscoreUsername: null,
    };


    this.simpanHighScore();
  }

  async simpanHighScore() {
    let highscore = await AsyncStorage.getItem("highscore")
    let highscoreUsername = await AsyncStorage.getItem("highscore_username")

    this.setState({
      highscore: highscore,
      highscoreUsername: highscoreUsername,
    })

    if (highscore == null || highscore < this.state.jumlahRonde) {
      await AsyncStorage.setItem("highscore", this.state.jumlahRonde);
      await AsyncStorage.setItem("highscore_username", this.state.username);
    }
  }

  restartGame() {
    this.props.navigation.navigate("Game");
  }

  async awalGame(){
    await AsyncStorage.removeItem("username");
    await AsyncStorage.removeItem("jumlahRonde");
    await AsyncStorage.removeItem("level");
    navigation.navigate('Login', { screen: 'Login' });
  }

  Login() {
    return (
      <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        </NavigationContainer>
    );
  }

  render() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
      }}>
        <Card style={styles.container}>
          <Card.Title>Hasil Permainan</Card.Title>
          <Text style={{ textAlign: "center", fontWeight: "bold" }} h1> {this.state.username}</Text>
          <Card.Divider />
          <View>
            <Text>{this.state.username}, kamu menang {this.state.jumlahRonde} ronde</Text>
            {
              this.state.highscoreUsername != null &&
              <Text>
                Highscore saat ini dipegang oleh {this.state.highscoreUsername} dengan skor {this.state.highscore}
              </Text>
            }
          </View>
        </Card>
        <Card.Divider />
        <View style={{
          flexDirection: 'row',
          marginHorizontal: 16,
          justifyContent: 'space-between',
        }}>
          <Button title={"Main Lagi"} onPress={() => this.restartGame()}></Button>
          <Button title={"Menu Utama"} onPress={()=> this.awalGame()}></Button>
        </View>
      </View>
    )
  }
}
export default Finish;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
