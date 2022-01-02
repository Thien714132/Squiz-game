import React from "react";
import { Component } from "react";
import { View, Text, ImageBackground,StyleSheet, Image, TouchableOpacity} from "react-native";
import {LinearGradient} from "expo-linear-gradient";


export default class leaderBoard extends Component{

    constructor(props) {
        super(props);
        this.state = { 
        }
      }

    render(){
        return(
            <ImageBackground source={require('../image/Back_ground.png')} style={styles.imgBackground}>
               <View style={styles.container}>
                   <View style={styles.waittingContainer}>
                        <Text style={{color: '#fff', fontSize: 25, fontWeight: 'bold'}}>Leader Board</Text>
                   </View>

                    <View style={styles.playerListContainer}>

                    </View>

                    <LinearGradient colors={['#F2D703', '#B8BD07']} style={styles.ClickedView} >
                            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.replace('dashboard')}>
                                <Text style={styles.buttonText}>Go home</Text>
                            </TouchableOpacity>
                    </LinearGradient>
               </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({

    imgBackground:{
        flex: 1,
        resizeMode: 'cover',
    },

    container:{
        flex: 1,
    },

    waittingContainer: {
        height: '10%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    playerListContainer:{
        height: '80%',
        width: '100%',
    },

    ClickedView:{
        alignSelf: 'center',
        justifyContent: 'center',
        height: 45,
        width: 150,
        backgroundColor: "#fff",
        elevation: 5,
        borderRadius: 10,
        marginBottom: 20,
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

})