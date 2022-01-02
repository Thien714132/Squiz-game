import React from "react";
import { Component } from "react";
import { View, ImageBackground,StyleSheet} from "react-native";
import * as Animatable from 'react-native-animatable';
import SoundPlayer from 'react-native-sound-player'

export default class splash extends Component{

    constructor(props) {
        super(props);
        this.state={
            _onFinishedPlayingSubscription:  null
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.replace('goPlaying');
        }, 3000)

        this.state._onFinishedPlayingSubscription = SoundPlayer.addEventListener('FinishedPlaying', ({ success }) => {
            console.log('finished playing', success)
          })
        
    }

    componentWillUnmount() {
        this.state._onFinishedPlayingSubscription.remove()
    }

    playSound(){

        setTimeout(() => {
            try {
                // play the file tone.mp3
                SoundPlayer.playSoundFile('splash_sound', 'mp3')
            } catch (e) {
                console.log(`cannot play the sound file`, e)
            }
        }, 1000);
    }

    render(){
        this.playSound();
        return(
            <ImageBackground source={require('../image/Back_ground.png')} style={styles.imgBackground}>
                <View style={styles.logoContainer}>
                    <Animatable.Image source={require('../image/logo3.png')} style={styles.logo} delay={1000}
                    duration={2000} animation='tada' ></Animatable.Image>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({

    imgBackground:{
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center'
    },

    logoContainer:{
        alignItems: 'center', 
        justifyContent:'center'
    },

    logo:{
        resizeMode: 'cover',
        justifyContent: 'center',
        maxHeight:165,
        maxWidth: 393
    }

})