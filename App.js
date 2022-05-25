import React, { useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ChatList from './screens/ChatList'
import Settings from './screens/Settings';
import Chat from './screens/Chat'
import Signin from './screens/Signin'
import Signup from './screens/Signup';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'
import { Provider } from 'react-native-paper';
import firebase from "@react-native-firebase/app";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDy9Bm_e__HjfOR03q87VsyDp1zlLpJMkU",
  authDomain: "reactchat-1db6c.firebaseapp.com",
  databaseURL: "https://reactchat-1db6c-default-rtdb.firebaseio.com",
  projectId: "reactchat-1db6c",
  storageBucket: "reactchat-1db6c.appspot.com",
  messagingSenderId: "57683816380",
  appId: "1:57683816380:web:4d7ca7baa69d9ba95f05b9"
};


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => {
  const navigation = useNavigation()
  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if ('!user') {
        navigation.navigate("SignUp")
      }
    })
  }, [])
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          return <Ionicons name={route.name === 'ChatList' ? "chatbubbles" : "settings"} color={'purple'} size={size} />
        },
      })}
    >
      <Tab.Screen name='ChatList' component={ChatList} />
      <Tab.Screen name='Setting' component={Settings} />
    </Tab.Navigator>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <Provider >
        <Stack.Navigator>
          <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
          <Stack.Screen name="SignIn" component={Signin} options={{ presentation: 'fullScreenModal', headerShown: false }} />
          <Stack.Screen name="SignUp" component={Signup} options={{ presentation: 'fullScreenModal', headerShown: false }} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  )
}
export default App