import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Clipboard from "expo-clipboard";
import Counter from "react-native-counters";
import { io } from "socket.io-client";
import config from "../config";
import { data } from "./data";
import axios from "axios";

const socket = io(`${config.URL}`, { jsonp: false });
const content = [
  {
    question: "1+1=?",
    options: ["1", "2", "3", "4"],
    correct_option: "2",
  },

  {
    question: "1+2=?",
    options: ["1", "2", "3", "4"],
    correct_option: "3",
  },

  {
    question: "8+1=?",
    options: ["1", "20", "13", "9"],
    correct_option: "9",
  },

  {
    question: "3+1=?",
    options: ["1", "2", "3", "4"],
    correct_option: "4",
  },

  {
    question: "1+100=?",
    options: ["111", "102", "103", "101"],
    correct_option: "101",
  },
];

export default class createRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idRoom: "1234587",
      Players: 5,
      Questions: 15,
      Time: 5,
      idUser: "",
      user: "",
    };
  }

//   getUserName() {
//     var self = this;
//     var name = "";
//     axios
//       .get(`${config.URL}/api/players/${self.state.idUser}`)
//       .then(function (res) {
//         //console.log(res.data)
//         // self.setState({user : res.data.name})
//         name = res.data.name;
//         console.log("b: " + name);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });

//     console.log("c: " + this.state.idUser);
//   }

  getUserName() {
    var self = this;
    AsyncStorage.getItem("id_user").then((id_user) => {
      this.setState({ idUser: id_user });
    //   console.log("a: " + this.state.idUser);

      axios
        .get(`${config.URL}/api/players/${id_user}`)
        .then(function (res) {
          //console.log(res.data)
          self.setState({ user: res.data.name });
        //   console.log("b: " + self.state.user);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }

  componentDidMount() {
    this.getUserName();
    // this.getUserName();
  }

  getRoomData() {
    socket.on("leftRoom", (data) => {
      console.log(data);
    });
    // console.log(this.state.data)
  }

  postRoomData() {
    socket.emit("createRoom", {
      hostId: this.state.idUser,
      content: content,
      timePerRound: this.state.Time,
      numOfPlayers: this.state.Players,
      hostName: this.state.user,
    });
    // console.log( content)
  }

  onChangePlayers(number, type) {
    //console.log(number, type) // 1, + or -
    this.setState({ Players: number });
  }

  onChangeQuestions(number, type) {
    //console.log(number, type) // 1, + or -
    this.setState({ Questions: number });
  }

  onChangeTime(number, type) {
    //console.log(number, type) // 1, + or -
    this.setState({ Time: number });
  }

  render() {
    return (
      <ImageBackground
        source={require("../image/Back_ground.png")}
        style={styles.imgBackground}
      >
        <TouchableOpacity
          style={styles.backBtContainer}
          onPress={() => this.props.navigation.navigate("dashboard")}
        >
          <Image
            source={require("../image/left-arrow.png")}
            style={styles.backBt}
          ></Image>
        </TouchableOpacity>

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

        <LinearGradient
          colors={["#FFB397", "#F46AA0"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.container}
        >
          <View style={{ alignItems: "center", height: "30%", width: "100%" }}>
            <Image
              source={require("../image/logo3.png")}
              style={styles.logo}
            ></Image>
          </View>
          <View style={styles.roomInfor}>
            <View style={styles.playerContainer}>
              <View style={styles.player}>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 25,
                    fontWeight: "bold",
                    alignSelf: "center",
                  }}
                >
                  Players
                </Text>
              </View>
              <Counter
                start={5}
                min={5}
                max={10}
                onChange={this.onChangePlayers.bind(this)}
              />
            </View>

            <View style={styles.playerContainer}>
              <View style={styles.player}>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 25,
                    fontWeight: "bold",
                    alignSelf: "center",
                  }}
                >
                  Questions
                </Text>
              </View>
              <Counter
                start={15}
                min={15}
                max={30}
                onChange={this.onChangeQuestions.bind(this)}
              />
            </View>

            <View style={styles.playerContainer}>
              <View style={styles.player}>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 25,
                    fontWeight: "bold",
                    alignSelf: "center",
                  }}
                >
                  Time
                </Text>
              </View>
              <Counter
                start={5}
                min={5}
                max={10}
                onChange={this.onChangeTime.bind(this)}
              />
            </View>
          </View>

          <LinearGradient
            colors={["#F2D703", "#B8BD07"]}
            style={styles.ClickedView}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.postRoomData()}
            >
              <Text style={styles.buttonText}>CREATE</Text>
            </TouchableOpacity>
          </LinearGradient>
        </LinearGradient>
        <TouchableOpacity
          style={{ backgroundColor: "red" }}
          onPress={() => this.getRoomData()}
        >
          <Text>Hello</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  imgBackground: {
    flex: 1,
    resizeMode: "cover",
  },

  backBtContainer: {
    alignContent: "flex-start",
    paddingTop: 20,
    paddingLeft: 20,
  },

  backBt: {
    height: 30,
    width: 30,
  },

  container: {
    width: "90%",
    height: "80%",
    borderRadius: 20,
    alignSelf: "center",
    elevation: 5,
  },

  idRoomContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 20,
    marginVertical: 10,
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

  logo: {
    flex: 1,
    resizeMode: "contain",
    aspectRatio: 1.8,
  },

  roomInfor: {},

  playerContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },

  player: {
    width: 200,
    backgroundColor: "#B783FF",
    alignSelf: "center",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
    marginLeft: -5,
    marginBottom: 20,
    justifyContent: "center",
    elevation: 5,
  },

  ClickedView: {
    alignSelf: "center",
    justifyContent: "center",
    height: 45,
    width: 200,
    backgroundColor: "#fff",
    elevation: 5,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 10,
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
});
