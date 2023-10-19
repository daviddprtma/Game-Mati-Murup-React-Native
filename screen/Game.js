import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";

class Game extends Component {

  constructor(props) {
    super(props);

    this.navigation = props.navigation

    this.state = {
      username: null,
      jumlahRonde: null,
      level: null,
      squares: Array.from(Array(9).keys()),
      gameMulai: false,
      rondeSelesai: false,
      ronde: 0,
      urutan: null,
      sedangMenyala: false,
      indexMenyala: 0,
      intervalMenyala: null,
      indexUrutanUser: 0,
    };

    props.navigation.addListener('focus', () => {
      this.setState({
        ronde: 0,
      })

      this.loadSettings().then(() => {
        setTimeout(() => {
          this.rondeSelanjutnya()
          // this.buatUrutan()
          // this.startMenyala()
        }, 500)
      })
    });
  }

  async loadSettings() {
    this.setState({
      username: await AsyncStorage.getItem("username"),
      jumlahRonde: await AsyncStorage.getItem("jumlahRonde"),
      level: await AsyncStorage.getItem("level"),
    })
  }

  // buatUrutan() {

  // }

  shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // startMenyala() {

  // }

  cekUrutan(squareIndex) {
    if (this.state.urutan[this.state.indexUrutanUser] == squareIndex) {
      this.setState({
        indexUrutanUser: this.state.indexUrutanUser + 1
      })

      if (this.state.indexUrutanUser == this.state.urutan.length - 1) {
        alert("Selamat " + this.state.username + ", anda menang")
        this.setState({
          rondeSelesai: true,
          gameMulai: false,
        })
      }
    } else {
      alert("Urutan salah. Sayang sekali " + this.state.username + ", kamu menekan urutan yang salah")
      this.navigation.navigate("Finish", { username: this.state.username, ronde: this.state.ronde -1 } )
    }
  }

  rondeSelanjutnya() {
    let jumlahKotak

    if (this.state.level == "gampang") {
      jumlahKotak = 5;
    } else if (this.state.level == "sedang") {
      jumlahKotak = 8;
    } else {
      jumlahKotak = 12;
    }

    this.setState({
      rondeSelesai: false,
      ronde: this.state.ronde + 1,
      urutan: this.shuffleArray(Array.from(Array(9).keys())).slice(0, jumlahKotak),
      indexUrutanUser: 0,
    })

    setTimeout(() => {
      this.setState({
        sedangMenyala: true,
        intervalMenyala: setInterval(() => {
          if (this.state.indexMenyala == this.state.urutan.length - 1) {
            clearInterval(this.state.intervalMenyala)

            this.setState({
              sedangMenyala: false,
              indexMenyala: 0,
              intervalMenyala: null,
              gameMulai: true,
            })

            return
          }

          this.setState({
            indexMenyala: this.state.indexMenyala + 1
          })
        }, 500)
      })

    }, 1000)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Nama {this.state.username} </Text>
        <Text h1>{this.state.gameMulai ? "Tekan Tombol Sesuai Urutan" : "Hapalkan Polanya"}</Text>
        <View style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 100px)",
          gap: "4px",
        }}>
          {this.state.squares.map((squareIndex) => {
            return (
              <Pressable
                key={squareIndex}
                onPress={() => {
                  if (this.state.gameMulai) {
                    this.cekUrutan(squareIndex)
                  }
                }}
                style={{
                  height: "100px",
                  width: "100px",
                  backgroundColor:
                    this.state.sedangMenyala && this.state.urutan[this.state.indexMenyala] == squareIndex ? "orange" : "lightgray"
                }}>
              </Pressable>
            );
          })}
        </View>
        <Text>Ronde {this.state.ronde}</Text>
        <Text>Level {this.state.level}</Text>
        {
          this.state.rondeSelesai &&
          <Button title={"Lanjut Ronde " + (this.state.ronde + 1)} onPress={() => { this.rondeSelanjutnya() }} >
          </Button>
        }
      </View>
    );
  }
}
export default Game;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
