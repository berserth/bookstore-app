import * as React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as firebase from 'firebase';

import Home from './src/screens/HomeScreen';
import Book from './src/screens/BookScreen';
import PdfReader from './src/screens/PdfReaderScreen';
import TextReader from './src/screens/TextReaderScreen';
import User from './src/screens/UserScreen';
import Upload from './src/screens/UploadBookScreen';

import Login from './src/screens/LoginScreen';
import SignUp from './src/screens/SignUpScreen';

import { firebaseConfig } from './src/config';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

LogBox.ignoreLogs(['Warning: ...']);

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={Home} options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons
            name="home"
            color={color}
            size={25}
          />
        ),
      }} />
      <Tab.Screen name='User' component={UserStack} options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons
            name="account"
            color={color}
            size={25}
          />
        ),
      }}/>
    </Tab.Navigator>
  );
}

function UserStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='User' component={User} options={{
          headerRight: () => (
            <TouchableOpacity
            style={{marginRight: 20}}
            onPress={() => firebase.auth().signOut()
              .then(() => {})
              .catch((error) => Alert.alert(error.message))}      
            >
            <Text>Sign out</Text>
            </TouchableOpacity>
          ),
        }}/>
      <Stack.Screen name='Upload' component={Upload} />
    </Stack.Navigator>
  );
}




export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticationReady: false,
      isAuthenticated: false,
    };

    if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  onAuthStateChanged = (user) => {
    this.setState({ isAuthenticationReady: true });
    this.setState({ isAuthenticated: !!user });
  }



  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {(this.state.isAuthenticated) ? (
            <>
              <Stack.Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />
              <Stack.Screen name="Book" component={Book} />
              <Stack.Screen name="PDF" component={PdfReader} />
              <Stack.Screen name="TextReader" component={TextReader} />
            </>
          ) : (
            <>
              <Stack.Screen name='Login' component={Login} />
              <Stack.Screen name='SignUp' component={SignUp} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

