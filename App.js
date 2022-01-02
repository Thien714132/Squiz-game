import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import splash from './screens/splash';
import goPlaying from "./screens/goPlaying";
import login from "./screens/login";
import dashboard from "./screens/dashboard";
import createRoom from "./screens/createRoom";
import pin from "./screens/pin";
import lobby from "./screens/lobby";
import quiz from "./screens/quiz";
import leaderBoard from "./screens/leaderBoard";



const Stack = createStackNavigator();


const App = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false }}>
        <Stack.Screen name='splash' component={splash}></Stack.Screen>
        <Stack.Screen name='goPlaying' component={goPlaying}></Stack.Screen>
        <Stack.Screen name='login' component={login}></Stack.Screen>
        <Stack.Screen name='dashboard' component={dashboard}></Stack.Screen>
        <Stack.Screen name='createRoom' component={createRoom}></Stack.Screen>
        <Stack.Screen name='pin' component={pin}></Stack.Screen>
        <Stack.Screen name='lobby' component={lobby}></Stack.Screen>
        <Stack.Screen name='quiz' component={quiz}></Stack.Screen>
        <Stack.Screen name='leaderBoard' component={leaderBoard}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;