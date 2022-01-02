import {React} from "react";
import  {Component}  from "react";
import { View, Text, ImageBackground,StyleSheet} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import {LinearGradient} from "expo-linear-gradient";

export default class goPlaying extends Component{
    
    render(){
        return(
            <ImageBackground source={require('../image/Back_ground.png')} style={styles.imgBackground}>
                
                <View style={{alignItems: 'center'}}>
                        <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold'}}>ID</Text>
                </View>

                <View style={styles.ClickedView}>
                    <TextInput style={styles.Input}
                        keyboardType="numeric"
                        textAlign= 'center'
                        textAlignVertical='center'>
                    </TextInput>
                </View>

                <View style={{alignItems: 'center'}}>
                        <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold'}}>Name</Text>
                </View>

                <View style={styles.ClickedView} >
                    <TextInput style={styles.Input}
                        textAlign= 'center'
                        textAlignVertical='center'>
                    </TextInput>
                </View>

                <LinearGradient colors={['#F2D703', '#B8BD07']} style={styles.ClickedView}>
                    <TouchableOpacity style={styles.button} >
                        <Text style={styles.buttonText}>PLAY</Text>
                    </TouchableOpacity>
                </LinearGradient>

                <LinearGradient colors={['#4C4FE3', '#EF3DAF'] } start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} style={styles.LoginField}>
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.replace('login')}>
                        <Text style={{color: '#fff', fontSize: 15,fontWeight: 'bold'}}>LOG IN</Text>
                    </TouchableOpacity>
                </LinearGradient>
                
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
    Input:{
        fontSize: 20,
        color:'#9ba9ba' ,
        fontWeight: '700'
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

    LoginField: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        height: 40,
        width: 80,
        borderRadius: 10, 
        elevation: 5
    }
})