import React from "react";
import { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { io } from "socket.io-client";
import config from "../config";
import { data } from "./data";
import axios from "axios";
import * as Clipboard from "expo-clipboard";
import { FlatList } from "react-native-gesture-handler";

const socket = io(`${config.URL}`, { jsonp: false });



export default class lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idRoom: "",
      listPlayer: [],
      numberOfPlayer: null,
      reload: "false",
    };
  }

  UNSAFE_componentWillMount() {
    this.getIdRoom();
    this.getListPlayer();
  }

  getListPlayer() {
    AsyncStorage.getItem("id_room").then((id_room) => {
      //this.setState({idRoom: id_room})
      socket.emit("roomInfo", { gameId: `${id_room}` });
    });
    //socket.emit('roomInfo', {gameId: `${this.state.idRoom}`})
    socket.on("roomInfoRes", (data) => {
      // console.log(data.playerData);
      this.setState({ listPlayer: data.playerData });
      // this.setState({ numberOfPlayer: data.numOfPlayers });
      AsyncStorage.setItem("num", JSON.stringify(data.playerData.length));
      //console.log(data.numOfPlayers);
      // Players=data.playerData
      //console.log(this.state.listPlayer);
      // console.log(data)
    });
  }

  loopToGetData() {
    var self = this;
    var time = 1;
    var j = 0;
    var i = 0;
    AsyncStorage.getItem('num').then((num) => {
      j= num
    })
    AsyncStorage.getItem('numberOfPlayer').then((numberOfPlayer) => {
      i = numberOfPlayer
    })
    var interval = setInterval(function () {
      if (j !== i) {
        AsyncStorage.getItem("id_room").then((id_room) => {
          socket.emit("roomInfo", { gameId: `${id_room}` });
        });
        socket.on("roomInfoRes", (data) => {
          // self.setState({ listPlayer: data.playerData });
          //console.log(data);
        });
        //console.log("1");
        time++;
      } else {
        clearInterval(interval);
      }
    }, 5000);
  }

  fullRoom() {
    socket.on("roomFull", (data) => {
     // console.log(data);
    });
  }

  getIdRoom() {
    AsyncStorage.getItem("id_room").then((id_room) => {
      this.setState({ idRoom: id_room });
    });
  }

  componentDidMount() {
    this.loopToGetData();
    // this.getListPlayer();
  }

  render() {
    return (
      <ImageBackground
        source={require("../image/Back_ground.png")}
        style={styles.imgBackground}
      >
        <View style={styles.container}>
          <View style={styles.waittingContainer}>
            <Text style={{ color: "#fff", fontSize: 25, fontWeight: "bold" }}>
              Waitting for other players...
            </Text>
          </View>

          <View style={styles.idRoomContainer}>
            <View style={{ alignItems: "center", flexDirection: "row" }}>
              <Text style={styles.idRoomText}>ID: </Text>
              <Text style={styles.idRoomText}>{this.state.idRoom}</Text>
            </View>
            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={() => Clipboard.setString(this.state.idRoom)}
            >
              <Image
                source={require("../image/copy.png")}
                style={{ height: 20, width: 20, tintColor: "#9ba9ba" }}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.playerListContainer}>
            {this.state.listPlayer.map((item) => (
              <View>
                <Text>{item.name}</Text>
              </View>
            ))}
          </View>

          <LinearGradient
            colors={["#F2D703", "#B8BD07"]}
            style={styles.ClickedView}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                //this.props.navigation.navigate("quiz")
                this.getListPlayer()
              }
            >
              <Text style={styles.buttonText}>PLAY</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  imgBackground: {
    flex: 1,
    resizeMode: "cover",
  },

  container: {
    flex: 1,
  },

  waittingContainer: {
    height: "10%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  playerListContainer: {
    height: "80%",
    width: "100%",
  },

  ClickedView: {
    alignSelf: "center",
    justifyContent: "center",
    height: 45,
    width: 100,
    backgroundColor: "#fff",
    elevation: 5,
    borderRadius: 10,
    marginTop: -50
  },

  button: {
    fontSize: 18,
    margin: 10,
    color: "#ffffff",
    backgroundColor: "transparent",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  idRoomContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 20,
    marginHorizontal: 100,
    borderColor: "#c0c100",
    borderWidth: 3,
    padding: 10,
    elevation: 5,
  },

  idRoomText: {
    fontSize: 20,
    color: "#9ba9ba",
    letterSpacing: 0,
    textAlign: "center",
  },
});
