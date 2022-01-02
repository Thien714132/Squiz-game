import React, { useState } from "react";
import { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from '@react-navigation/native';

const quiz = () => {
  const data = [
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
  const navigation = useNavigation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showScoremodal, setShowScoremodal] = useState(false)

  const renderQuestion = () => {
    return (
      <View>
        <StatusBar barStyle="light-content"></StatusBar>
        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
          <Text style={{ color: "#fff", fontSize: 30 }}>
            {currentQuestionIndex + 1}/
          </Text>
          <Text style={{ color: "#fff", fontSize: 20 }}>{data.length}</Text>
        </View>

        {/* question */}

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 20,
          }}
        >
          <Text style={{ fontSize: 50, color: "#fff" }}>
            {data[currentQuestionIndex]?.question}
          </Text>
        </View>
      </View>
    );
  };

  const validateAnser = (selectedOption) => {
    let correct_option = data[currentQuestionIndex]["correct_option"];
    setCurrentOptionSelected(selectedOption);
    setCorrectOption(correct_option);
    setIsOptionsDisabled(true);
    if (selectedOption == correct_option) {
      setScore(score + 1);
    }

    setShowNextButton(true);
  };

  const renderOptions = () => {
    return (
      <View>
        {data[currentQuestionIndex]?.options.map((options) => (
            
          <TouchableOpacity
            onPress={() => validateAnser(options)}
            disabled={isOptionsDisabled}
            key={options}
            style={{
              borderWidth: 1,
              borderColor:'grey',
                // options == correctOption
                //   ? "#c0c100"
                //   : options == currentOptionSelected
                //   ? "red"
                //   : '#fff',
              height: 60,
              borderRadius: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 20,
              marginVertical: 10,
              backgroundColor: options == correctOption
              ? "#93E273"
              : options == currentOptionSelected
              ? "#FB2525"
              : '#fff',
              elevation: 10
            }}
          >
            <Text style={{ fontSize: 25, color: "#5568C5", fontWeight: 'bold'}}>{options}</Text>
            {options == correctOption ? (
              <View>
                <Text>true</Text>
              </View>
            ) : options == currentOptionSelected ? (
              <View>
                <Text>false</Text>
              </View>
            ) : null}
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const handleNextButton = () => {
      if (currentQuestionIndex == data.length-1){
        setShowScoremodal(true)
      }else{
          setCurrentQuestionIndex(currentQuestionIndex+1);
          setCurrentOptionSelected(null);
          setCorrectOption(null);
          setIsOptionsDisabled(false);
          setShowNextButton(false)
      }
  }

  const renderNextButton = () => {
    if (showNextButton) {
      return (
        <LinearGradient
          colors={["#F2D703", "#B8BD07"]}
          style={styles.ClickedView}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={handleNextButton}
          >
            <Text style={styles.buttonText}>NEXT</Text>
          </TouchableOpacity>
        </LinearGradient>
      );
    } else{
        return null
    }
  };

  const restartQuiz = () => {
      setShowScoremodal(false);
      setCurrentQuestionIndex(0);
      setScore(0);
      setCurrentOptionSelected(null);
      setCorrectOption(null);
      setIsOptionsDisabled(false),
      setShowNextButton(false)
  }

  return (
    <ImageBackground
      source={require("../image/Back_ground.png")}
      style={styles.imgBackground}
    >
      <View style={styles.quizContainer}>

        {renderQuestion()}
        {renderOptions()}
        {renderNextButton()}
        
        {/* modal */}

        <Modal
            animationType="slide"
            transparent={true}
            visible={showScoremodal}
            >
            <View style={{
                flex: 1,
                backgroundColor: 'green',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <View style={{
                    backgroundColor: 'white',
                    width: '90%',
                    borderRadius: 20,
                    padding: 20,
                    alignItems: 'center'
                }}>
                    <Text>{score> (data.length/2) ? 'Congratulation': 'Oops'}</Text>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        marginVertical: 20
                    }}>
                        <Text style={{color: score> (data.length/2) ?  'green': 'red'}}>{score}</Text>
                        <Text>/ {data.length}</Text>
                    </View>

                    <TouchableOpacity style={{ width: '100%', alignItems: 'center'}} onPress={() => navigation.navigate('leaderBoard')}>
                        <Text>Retry quiz</Text>
                    </TouchableOpacity>
                </View>

                
            </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

export default quiz;

const styles = StyleSheet.create({
  imgBackground: {
    flex: 1,
    resizeMode: "cover",
  },

  quizContainer: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 16,
    position: "relative",
  },

  ClickedView:{
    alignSelf: 'center',
    justifyContent: 'center',
    height: 60,
    width: '100%',
    backgroundColor: "#fff",
    elevation: 5,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 50
},

  button: {
    fontSize: 18,
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
    alignItems: 'center',
    },

  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
},
});
