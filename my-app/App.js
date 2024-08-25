
import { LogBox } from 'react-native';
import { useEffect } from 'react';
LogBox.ignoreAllLogs();
import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/login';
import SignScreen from './screens/signup';
import HomeScreen from './screens/journal';
import QuestionScreen from './screens/questionscreen';
import MusicScreen from './screens/music';
import TherapyScreen from './screens/therapy';
import MeditationPage from './screens/therapy';
import SentimentScreen from './screens/question';

console.disableYellowBox = true;

const Stack = createStackNavigator();

export default function Apps() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Sign"
          component={SignScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Question"
          component={QuestionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Music"
          component={MusicScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Therapy"
          component={TherapyScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Meditation"
          component={MeditationPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Sentiment"
          component={SentimentScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const WelcomeScreen = ({ navigation }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <View style={styles.container}>
      {}
      <TouchableOpacity style={styles.topLeftIcon}>
        <Image
          source={require('./assets/logo.png')}
          style={styles.topLeftIconImage}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.topRightButton} onPress={() => alert("Dark mode isn't currently available")}>
        <Image
          source={{ uri: 'https://static.thenounproject.com/png/765894-200.png' }}
          style={styles.topRightButtonImage}
        />
      </TouchableOpacity>

      <Text style={styles.heading}>Welcome to Mind Therapy</Text>

      {}
      <View style={styles.space}></View>

      <Text style={styles.subHeading}></Text>

      <Text style={styles.description}>
        We believe the world needs a mental health boost. We need everything we can get our hands on to help bust through the stigma surrounding mental health. We gain the confidence that it is OK to need and seek out help, and in turn we gain the ability to live the best lives we can possibly see ourselves living.
      </Text>

      <TouchableOpacity
        style={styles.getStartedButton}
        onPress={() => navigation.navigate('Sign')}
      >
        <Text style={styles.getStartedButtonText}>Get Started</Text>
      </TouchableOpacity>
      <Text style={styles.getStartedText}
        onPress={() => navigation.navigate('Login')}
      >Already have an account ?</Text>
      {isSidebarOpen && (
        <View style={styles.sidebar}>
          <TouchableOpacity onPress={toggleSidebar}>
            <Text style={styles.closeSidebar}>X</Text>
          </TouchableOpacity>

          <View style={styles.sidebarSection}>
            <TouchableOpacity style={styles.sidebarButton}>
              <Text style={styles.sidebarButtonText}>HOME</Text>
            </TouchableOpacity>
            {}
            <TouchableOpacity style={styles.sidebarButton}
              onPress={() => {
                navigation.navigate('Sign');
                toggleSidebar();
              }}

            >
              <Text style={styles.sidebarButtonText}>SIGN UP</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sidebarButton}
              onPress={() => {
                navigation.navigate('Login');
                toggleSidebar();
              }}
            >
              <Text style={styles.sidebarButtonText}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sidebarButton}>
              <Text style={styles.sidebarButtonText}>CONTACT</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sidebarButton}
              onPress={() => navigation.navigate('Dashboard')}
            >
              <Text style={styles.sidebarButtonText}>Dashboard</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DAC4FF',
    padding: 30,
  },
  heading: {
    marginTop: 50,
    fontSize: 40,
    fontWeight: '900',
    color: 'white',
    marginBottom: 30,
  },
  space: {
    height: 10,
  },
  subHeading: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 30,
  },
  description: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 30,
  },
  getStartedButton: {
    backgroundColor: '#4169E1',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 4,
    elevation: 15,
  },
  getStartedButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  topLeftIcon: {
    marginTop: 20,
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 3
  },
  topRightButtonImage: {
    width: 40,
    height: 40,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 20,
    backgroundColor: 'white'

  },
  getStartedText:
  {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 30,
    color: 'white'
  },
  topRightButton: {
    marginTop: 20,
    position: 'absolute',
    top: 20,
    right: 20,
  },
  topLeftIconImage: {
    width: 40,
    height: 40,
    borderRadius: 15,
    marginTop: 20,
    zIndex: 3,
  },
  sidebar: {
    position: 'absolute',
    top: 35,
    left: 0,
    width: '60%',
    height: '100%',
    backgroundColor: 'antiquewhite',
    zIndex: 2,
    padding: 10,
  },
  sidebarSection: {
    marginTop: 30,
  },
  sidebarButton: {
    marginTop: 7,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  sidebarButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue',
    textAlign: 'center',
  },
  closeSidebar: {
    alignSelf: 'flex-end',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

