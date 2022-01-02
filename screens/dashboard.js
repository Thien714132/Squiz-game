import React from "react";
import { Component } from "react";
import { View, Text, ImageBackground,StyleSheet, Image, TouchableOpacity} from "react-native";
import AsyncStorage  from "@react-native-async-storage/async-storage";
import {LinearGradient} from "expo-linear-gradient";

export default class dashboard extends Component{

    logOut() {
        AsyncStorage.removeItem('id_user').then((id_user) => {
            if(id_user === null){
                this.props.navigation.replace('login');
                console.log(id_user)
            }
        });
            
        
    }

    render(){
        return(
            <ImageBackground source={require('../image/Back_ground.png')} style={styles.imgBackground}>
                <View style={styles.container}>
                    <TouchableOpacity style={{alignSelf: 'baseline'}}>
                        <View style={styles.userContainer}>
                            <Image source={require('../image/user.png')} style={styles.avatar}></Image>

                            <View style={{justifyContent: 'center', paddingLeft: 10}}>
                                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 15}}>714132</Text>
                                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 15}}>30 wins</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.item}>
                        <Image source={require('../image/coin.png')} style={{height: 20, width: 20}}></Image>
                        <View style={{width: 30, alignItems: 'center'}}>
                            <Text style={{color: '#fff', fontWeight: 'bold'}}>0</Text>
                        </View>
                        <TouchableOpacity style={{alignSelf: 'baseline'}}>
                            <Image source={require('../image/plus-sign.png')} style={{height: 20, width: 20}}></Image>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.item}>
                        <Image source={require('../image/gem.png')} style={{height: 20, width: 20}}></Image>
                        <View style={{width: 30, alignItems: 'center'}}>
                            <Text style={{color: '#fff', fontWeight: 'bold'}}>0</Text>
                        </View>
                        <TouchableOpacity style={{alignSelf: 'baseline'}}>
                            <Image source={require('../image/plus-sign.png')} style={{height: 20, width: 20}}></Image>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{alignItems: 'center', paddingBottom: 30}}>
                    <Text style={{color: '#fff', fontSize: 25, fontWeight: 'bold'}}>Let's play</Text>
                </View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('createRoom')}>
                    <LinearGradient colors={['#FFB397', '#F46AA0'] } start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} style={styles.dashItem}>
                        <View style={styles.inputContent}>
                            <View style={{paddingLeft:30, alignSelf: 'center'}}>
                                <Image source={require('../image/logo2.png')} style={{height: 64, width: 75}}></Image>
                            </View>
                            <View style={{position:'absolute', right: 30, alignSelf: 'center'}}>
                                <View style={{padding: 5, width: 23,borderColor: 'white', borderWidth: 1, borderRadius: 7, alignItems: 'center', alignSelf: 'flex-end' ,marginBottom: 5}}>
                                    <Image source={require('../image/triangle.png')} style={{height: 10, width: 10, tintColor: 'white'}}/>
                                </View>
                                <Text style={{color: '#fff', fontSize: 25, fontWeight: 'bold', alignSelf: 'flex-end'}}>Room</Text>
                                <Text style={{color: '#fff', fontSize: 15}}>create your room</Text>
                            </View>
                        </View>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity>
                    <LinearGradient colors={['#FFAEBF', '#B783FF'] } start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} style={styles.dashItem}>
                        <View style={styles.inputContent}>
                            <View style={{paddingLeft: 30}}>
                                <View style={{padding: 5, width: 23,borderColor: 'white', borderWidth: 1, borderRadius: 7, alignItems: 'center' ,marginBottom: 5}}>
                                    <Image source={require('../image/triangle.png')} style={{height: 10, width: 10, tintColor: 'white'}}/>
                                </View>
                                <Text style={{color: '#fff', fontSize: 25, fontWeight: '700'}}>Join</Text>
                                <Text style={{color: '#fff', fontSize: 15}}>get id to join</Text>
                            </View>

                            <View style={{position: 'absolute', right: 30, alignSelf: 'center'}}>
                                <Image source={require('../image/join.png')} style={{height: 87, width: 70}}></Image>
                            </View>
                        </View>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity>
                    <LinearGradient colors={['#FDC830', '#f37335'] } start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} style={styles.dashItem}>
                        <View style={styles.inputContent}>
                            <View style={{paddingLeft:30, alignSelf: 'center'}}>
                                <Image source={require('../image/tutorial.png')} style={{height: 90, width: 70}}></Image>
                            </View>
                            <View style={{position:'absolute', right: 30, alignSelf: 'center'}}>
                                <View style={{padding: 5, width: 23,borderColor: 'white', borderWidth: 1, borderRadius: 7, alignItems: 'center', alignSelf: 'flex-end' ,marginBottom: 5}}>
                                    <Image source={require('../image/triangle.png')} style={{height: 10, width: 10, tintColor: 'white'}}/>
                                </View>
                                <Text style={{color: '#fff', fontSize: 25, fontWeight: 'bold', alignSelf: 'flex-end'}}>Tutorial</Text>
                                <Text style={{color: '#fff', fontSize: 15, alignSelf: 'flex-end'}}>how to play</Text>
                            </View>
                        </View>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> this.logOut()}>
                    <LinearGradient colors={['#3BF3A8', '#46D0ED'] } start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} style={styles.dashItem}>
                        <View style={styles.inputContent}>
                            <View style={{paddingLeft: 30}}>
                                <Text style={{color: '#fff', fontSize: 25, fontWeight: 'bold'}}>Log out</Text>
                                <Text style={{color: '#fff', fontSize: 15}}>see you!</Text>
                            </View>

                            <View style={{position: 'absolute', right: 30, alignSelf: 'center'}}>
                                <Image source={require('../image/log-out-2.png')} style={{height: 90, width: 70}}></Image>
                            </View>
                        </View>
                    </LinearGradient>
                </TouchableOpacity>                
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
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf:'flex-start',
        padding: 25,
    },

    avatar:{
        height: 40,
        width: 40,
        overflow: 'hidden',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#fff'
    },
    userContainer:{
        alignSelf: 'baseline',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#rgba(0,0,0,0.1)',
        borderRadius: 30,
        paddingLeft: 10,
        paddingRight: 25,
        paddingVertical: 5,
    },

    item:{
        alignSelf: 'center',
        backgroundColor: '#rgba(0,0,0,0.1)',
        borderRadius: 11.5,
        flexDirection: 'row',
        marginLeft: 30
    },

    dashItem:{
        height: 120,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 30,
        elevation: 10,
        marginBottom: 30,
        justifyContent: 'center'
    },
    inputContent:{
        flexDirection: 'row',
    }
})