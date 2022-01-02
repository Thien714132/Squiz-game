import axios from "axios";
import React from "react";
import { Component } from "react";
import { View, Text, ImageBackground,StyleSheet, Image} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {LinearGradient} from "expo-linear-gradient";
import config from "../config";
import AsyncStorage  from "@react-native-async-storage/async-storage";

export default class pin extends Component{
    
    constructor(props) {
        super(props);
        this.state={
            pinCode: ['','','','','',''],
            pinString: null,
        };
    }

    onPressNumber = num => {
        let tempPin = this.state.pinCode;
        for (var i=0; i< tempPin.length; i++){
            if(tempPin[i] == ''){
                tempPin[i]= num;
                break;
            }else{
                continue;
            }
        }
        //let c = tempPin.toString()
        this.setState({pinCode: tempPin})
        this.setState({pinString: tempPin.join("").toString()})
        //console.log(c)
    }

    onPressCancel = () =>{
        let tempPin = this.state.pinCode;
        for (var i = tempPin.length - 1; i>= 0; i--){
            if (tempPin[i] != ''){
                tempPin[i] = '';
                break;
            } else{
                continue;
            }
        }
        //let c = tempPin.toString()
        this.setState({pinCode: tempPin})
        this.setState({pinString: tempPin.join("").toString()})
        //console.log(c)
    }  

    authentication(){
        AsyncStorage.getItem('id_user').then((id_user) => {
            axios.post(`${config.URL}/api/auth/round2`,{_id: id_user, pin: this.state.pinString})
            .then((res) => {if (res.data === 'Login successfully.'){
                this.props.navigation.replace('dashboard')
            }
            }).catch( async (err) => {
                console.log(err);
                // alert(err)
                const value = await AsyncStorage.removeItem('id_user');
                if(value === null){
                    this.props.navigation.replace('login')
                }
                alert('Pin is wrong')
            })
        })
    }

    removeKey() {
        
    }

    render(){
        let numbers = [
            {id: '1'},{id: '2'},{id: '3'}, {id: '4'},{id: '5'},
            {id: '6'},{id: '7'},{id: '8'},{id: '9'},{id: '0'},
        ]
        return(
            <ImageBackground source={require('../image/Back_ground.png')} style={styles.imgBackground}>
                <TouchableOpacity style={styles.backBtContainer} onPress={() => this.props.navigation.navigate('login')}>
                    <Image source={require('../image/left-arrow.png')} style={styles.backBt}></Image>
                </TouchableOpacity>

                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{marginTop: 60}}>
                        <Text style={styles.enterPinText}>Enter Pincode</Text>
                    </View>
                </View>

                <View style={styles.pinCodeContainer}>
                    {
                        this.state.pinCode.map(p=>{
                            let style = p != ''? styles.pinCode2: styles.pinCode1
                            return <View style={style}></View>
                        })
                    }
                    
                </View>

                <View style={{alignItems:'center', justifyContent: 'center', marginTop: 60}}>
                    <View style={styles.numberContainer}>
                        {numbers.map(num=> {
                            return(<TouchableOpacity style={styles.number} key={num.id} onPress={() => this.onPressNumber(num.id)}>
                                        <Text style={styles.numberText}>{num.id}</Text>
                                    </TouchableOpacity>)
                        })}
                    </View>
                </View>
                
                <View style={{paddingHorizontal: 60}}>
                    <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                        <LinearGradient colors={['#F2D703', '#B8BD07']} style={styles.ClickedView} >
                                <TouchableOpacity style={styles.button} onPress={() => {this.authentication()
                                                                                        this.onPressNumber()
                                                                                        //this.pinEncrypt()
                                                                                        //console.log(this.state.pinCode)
                                                                                        // console.log(this.state.pinString)
                                                                                        }}>
                                    <Text style={styles.buttonText}>Enter</Text>
                                </TouchableOpacity>
                        </LinearGradient>

                        <LinearGradient colors={['#F2D703', '#B8BD07']} style={styles.ClickedView} >
                            <TouchableOpacity style={styles.button} onPress={() => this.onPressCancel()}>
                                <Text style={styles.buttonText}>Delete</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                    
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

    enterPinText:{
        fontSize: 22,
        color: '#fff',
        letterSpacing: -0.4,
        lineHeight: 22
    },

    pinCodeContainer:{
        paddingHorizontal: 100,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 50,
    },

    pinCode1:{
        width: 20,
        height: 20,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#fff'
    },

    pinCode2:{
        width: 20,
        height: 20,
        borderRadius: 20,
        backgroundColor: '#fff'
    },

    number:{
        width: 65,
        height: 65,
        borderRadius: 65,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 8
    },

    numberContainer:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: 348,
        width: 250,
        alignItems: 'center',
        justifyContent: 'center',

    },

    numberText:{
        fontSize: 35,
        color: '#fff',
        letterSpacing: 0,
        textAlign: 'center'
    },

    ClickedView:{
        marginTop: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        height: 45,
        width: 100,
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