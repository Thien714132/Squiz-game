import React from "react";
import { Component } from "react";
import { View, Text, ImageBackground,StyleSheet, Image} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import {LinearGradient} from "expo-linear-gradient";
import axios from "axios";
import config from '../config';
import jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default class login extends Component{

    constructor(props) {
        super(props);
        this.toggleSwitch = this.toggleSwitch.bind(this);
        this.state = {
            userName: '',
            password: '',
            token: '',
            id_user: '',
            showPassword: true,
        }
      }

    toggleSwitch() {
        this.setState({ showPassword: !this.state.showPassword });
    }

    authentication(){
        axios.post(`${config.URL}/api/auth/round1`, {username: this.state.userName, password: this.state.password}).then((res) => {
            const id = jwtDecode(res.data);
             AsyncStorage.setItem('id_user', id._id).then(() => {
                this.props.navigation.navigate('pin')
            })
            //console.log(res.data)
        }).catch(function (error){
            alert('Username or password is wrong.')
        })
    }


    render(){
        return(
            <ImageBackground source={require('../image/Back_ground.png')} style={styles.imgBackground}>
                <TouchableOpacity style={styles.backBtContainer} onPress={() => this.props.navigation.navigate('goPlaying')}>
                    <Image source={require('../image/left-arrow.png')} style={styles.backBt}></Image>
                </TouchableOpacity>
                
                <View style={styles.formContainer}>
                    <View style={{alignItems: 'center'}}>
                            <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold'}}>Username</Text>
                    </View>

                    <View style={styles.ClickedView}>
                        <TextInput style={styles.Input}
                            keyboardType="numeric"
                            textAlign= 'center'
                            textAlignVertical='center'
                            onChangeText={(text) => {
                                this.setState({userName: text})
                            }}>
                        </TextInput>
                    </View>

                    <View style={{alignItems: 'center'}}>
                            <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold'}}>Password</Text>
                    </View>

                    <View style={styles.ClickedView2}>
                            <TextInput style={styles.Input}
                                textAlign= 'center'
                                textAlignVertical='center'
                                secureTextEntry={this.state.showPassword}
                                onChangeText={(text) => this.setState({ password: text })}>
                            </TextInput>

                            <TouchableOpacity style={{flex: 1 ,justifyContent: 'center'}} onPress={() => this.toggleSwitch()}>
                                <Image source={require('../image/eye.png')} style={{height: 20, width: 20, tintColor: '#9ba9ba'}}></Image>
                            </TouchableOpacity>

                            
                    </View>

                    <LinearGradient colors={['#F2D703', '#B8BD07']} style={styles.ClickedView} >
                        <TouchableOpacity style={styles.button} 
                                        onPress={() => this.authentication()}>
                            <Text style={styles.buttonText}>LOG IN</Text>
                        </TouchableOpacity>
                    </LinearGradient>

                    <TouchableOpacity style={{alignItems:'center'}}>
                        <Text style={{color: '#fff'}}>Forgot password ?</Text>
                    </TouchableOpacity>
                    
                    <LinearGradient colors={['#4C4FE3', '#EF3DAF'] } start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} style={styles.LoginField}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={{color: '#fff', fontSize: 15,fontWeight: 'bold'}}>REGISTER</Text>
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

    backBtContainer:{
        alignContent: 'flex-start',
        paddingTop: 20,
        paddingLeft: 20
    },

    backBt:{
        height: 30,
        width: 30
    },
    ClickedView:{
        alignSelf: 'center',
        justifyContent: 'center',
        height: 45,
        width: 200,
        backgroundColor: "#fff",
        elevation: 5,
        borderRadius: 10,
        marginBottom: 20,
    },
    ClickedView2:{
        alignSelf: 'center',
        height: 45,
        width: 200,
        backgroundColor: "#fff",
        elevation: 5,
        borderRadius: 10,
        marginBottom: 20,
        flexDirection: 'row'
    },
    Input:{
        fontSize: 20,
        color:'#9ba9ba' ,
        fontWeight: '700',
        width: 170,
        paddingLeft: 20
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

    formContainer:{
        flex: 1,
        justifyContent: 'center',
        marginTop: -50
    },
    
    LoginField: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        height: 40,
        width: 100,
        borderRadius: 10, 
        elevation: 5
    }
})